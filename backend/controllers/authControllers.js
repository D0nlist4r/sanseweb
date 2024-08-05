import { v4 as uuidv4 } from 'uuid';
import boom from '@hapi/boom';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { checkRecordExists, insertRecord } from '../database/sqlFunctions.js';

const generateAccessToken = (userId,userName) => {
    return jwt.sign({ userId,userName }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_TIEMPO_EXPIRA });
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
                let tmpToken = generateAccessToken(existingUser.id_usuario,existingUser.usuario);
                const cookiesOptions = {
                    httpOnly: true, // La cookie solo se puede acceder desde el servidor
                    secure: process.env.NODE_ENV === 'production' ? true : false, // La cookie solo se puede acceder a través de HTTPS
                    sameSite: 'strict', // La cookie no se enviará en solicitudes de origen cruzado
                    maxAge: process.env.JWT_COOKIE_EXPIRES * 1000 * 60 * 60, // La cookie tiene un tiempo de validez de 1 h
                }
                res.cookie('jwt', tmpToken, cookiesOptions)
                res.status(200).json({
                    status: true,
                    message: "User logged in successfully!",
                    data: {
                        userId: existingUser.userId,
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
    res.clearCookie('jwt');
    res.status(200).json({ status: true, message: 'Sesión cerrada' });
};

export { register, login,logout };