// controllers/transaccionesController.js
import TransaccionService from '../services/transacciones.services.js';
const transaccionService = new TransaccionService();

const createTransaccion = async (req, res, next) => {
    try {
        const { id_servicio, id_usuario, accion, valor } = req.body;
        let response = await transaccionService.create(id_servicio, id_usuario, accion, valor);
        res.json(response);
    } catch (error) {
        next(error);
    }
}

const getTransaccionById = async (req, res, next) => {
    try {
        const { cod_registro } = req.params;
        let response = await transaccionService.getById(cod_registro);
        if (response.status) {
            res.status(200).json(response);
        } else {
            res.status(404).json(response);
        }
    } catch (error) {
        next(error);
    }
}

const updateTransaccion = async (req, res, next) => {
    try {
        const { cod_registro } = req.params;
        const data = req.body;
        let response = await transaccionService.update(cod_registro, data);
        if (response.status) {
            res.status(200).json(response);
        } else {
            res.status(404).json(response);
        }
    } catch (error) {
        next(error);
    }
}

const deleteTransaccion = async (req, res, next) => {
    try {
        const { cod_registro } = req.params;
        let response = await transaccionService.delete(cod_registro);
        if (response.status) {
            res.status(200).json(response);
        } else {
            res.status(404).json(response);
        }
    } catch (error) {
        next(error);
    }
}

const getTransacciones = async (req, res, next) => {
    try {
        let response = await transaccionService.getAll();
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

export { createTransaccion, getTransaccionById, updateTransaccion, deleteTransaccion, getTransacciones };
