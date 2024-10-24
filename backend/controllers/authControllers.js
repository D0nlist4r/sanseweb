import { v4 as uuidv4 } from 'uuid';
import boom from '@hapi/boom';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { checkRecordExists, insertRecord, updateRecord } from '../database/sqlFunctions.js';

const generateAccessToken = (userId,userName,esAdmin) => {
    return jwt.sign({ userId,userName,esAdmin }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_TIEMPO_EXPIRA });
};

const register = async (req, res, next) => {
    const { nombres, contrasena, usuario, email, telefono, fecha_creacion } = req.body;
    if (!email || !contrasena) {
        res
            .status(400)
            .json({ status: false, error: "Email or Password fields cannot be empty!" });
        return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(contrasena, salt);
    const user = {
        id_usuario: uuidv4(),
        nombres,
        contrasena: hashedPassword,
        usuario,
        email,
        telefono,
        fecha_creacion
    };
    try {
        const userAlreadyExists = await checkRecordExists("seguridad_usuarios", "email", email);
        if (userAlreadyExists) {
            res.status(409).json({ status: false, error: "Email already exists" });
        } else {
            await insertRecord("seguridad_usuarios", user);
            res.status(201).json({ status: true, message: "User created successfully!" });
        }
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    const { email, contrasena } = req.body;
    if (!email || !contrasena) {
        res
            .status(400)
            .json({ error: "Email or Password fields cannot be empty!" });
        return;
    }
    try {
        const existingUser = await checkRecordExists("seguridad_usuarios", "email", email);
        if (existingUser) {
            if (!existingUser.contrasena) {
                res.status(401).json({ status: false, error: "Invalid credentials" });
                return;
            }
            const passwordMatch = await bcrypt.compare(
                contrasena,
                existingUser.contrasena
            );
            if (passwordMatch) {
                let tmpToken = generateAccessToken(existingUser.id_usuario,existingUser.usuario,existingUser.es_admin);
                const cookiesOptions = {
                    httpOnly: true, // La cookie solo se puede acceder desde el servidor
                    secure: process.env.NODE_ENV === 'production' ? true : false, // La cookie solo se puede acceder a través de HTTPS
                    sameSite: 'strict', // La cookie no se enviará en solicitudes de origen cruzado
                    maxAge: process.env.JWT_COOKIE_EXPIRES * 1000 * 60 * 60, // La cookie tiene un tiempo de validez de 1 h
                }
                res.cookie('jwt', tmpToken, cookiesOptions);
                updateRecord("seguridad_usuarios", { ultimo_login: new Date().toISOString().split('T')[0], activo: 1 }, existingUser.id_usuario);
                res.status(200).json({
                    status: true,
                    message: "User logged in successfully!",
                    data: {
                        userId: existingUser.id_usuario,
                        email: existingUser.email,
                        nombre: existingUser.usuario,
                    },
                });
            } else {
                res.status(401).json({ status: false, error: "Invalid credentials" });
            }
        } else {
            res.status(401).json({ status: false, error: "Invalid credentials" });
        }
    } catch (error) {
        next(error);
    }
};

const logout = (req, res, next) => {
    // se recibe el id del usuario desde los parametros
    const { idUser } = req.params;
    // limpieza de las cockies
    res.clearCookie('jwt');
    // actualizacion del usuario en la db
    updateRecord("seguridad_usuarios", { ultimo_login: new Date().toISOString().split('T')[0], activo: 0 }, idUser);
    res.status(200).json({ status: true, message: 'Sesión cerrada' });
};

const updatePassword = async (req, res, next) => {
    const { idUser, contrasena, contrasenaNueva } = req.body;
    try {
        const existingUser = await checkRecordExists("seguridad_usuarios", "id_usuario", idUser);
        if (existingUser) {
            const passwordMatch = await bcrypt.compare(
                contrasena,
                existingUser.contrasena
            );
            if (passwordMatch) {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(contrasenaNueva, salt);
                updateRecord("seguridad_usuarios", { contrasena: hashedPassword }, idUser);
                res.status(200).json({ status: true, message: 'Contraseña actualizada correctamente' });
            } else {
                res.status(401).json({ status: false, error: 'Contraseña incorrecta' });
            }
        } else {
            res.status(404).json({ status: false, error: 'Usuario no encontrado' });
        }
    } catch (error) {
        next(error);
    }
}

export { register, login,logout,updatePassword };