import e from 'express';
import usersService from '../services/users.services.js';
const user = new usersService();


const getInfoUser = async (req, res, next) => {
    try {
        const { idUser } = req.params;
        let response = await user.getInfo(idUser);
        if (response.status) {
            res.status(200).json(response);
        } else {
            res.status(404).json(response);
        }
    } catch (error) {
        next(error); //se agrega el next para atrapar de forma explicita el error con el middleware
    }
}

const createUser = async (req, res, next) => {
    try {
        const body = req.body;
        const response = await user.create(body.nombres, body.contrasena, body.usuario, body.email, body.telefono, body.fecha_creacion);
        res.json(response);
    } catch (error) {
        next(error);
    }
}

const updateUser = async (req, res, next) => {
    try {
        const { idUser } = req.params;
        const body = req.body;
        let response = await user.update(idUser, body.nombres, body.contrasena, body.usuario, body.email, body.telefono, body.fecha_actualizacion);
        if (response.status) {
            res.status(200).json(response);
        } else {
            res.status(404).json(response);
        }
    } catch (error) {
        next(error); //se agrega el next para atrapar de forma explicita el error con el middleware
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const { idUser } = req.params;
        let response = await user.deleteUser(idUser);
        if (response.status) {
            res.status(200).json(response);
        } else {
            res.status(404).json(response);
        }
    } catch (error) {
        next(error);
    }
}

// obtener listado usuarios
const getUsers = async (req, res, next) => {
    try {
        let response = await user.getUsers();
        console.log(response);
        if (response.status) {
            res.status(200).json(response);
        } else {
            res.status(404).json(response);
        }
    } catch (error) {
        next(error);
    }
}

export { getInfoUser, createUser, updateUser, deleteUser, getUsers };