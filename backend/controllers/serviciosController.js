// controllers/serviciosController.js
import ServicioService from '../services/servicios.services.js';
const servicioService = new ServicioService();

const createServicio = async (req, res, next) => {
    try {
        const { nom, fecha_creacion } = req.body;
        let response = await servicioService.create(nom, fecha_creacion);
        res.json(response);
    } catch (error) {
        next(error);
    }
}

const getServicioById = async (req, res, next) => {
    try {
        const { id_servicio } = req.params;
        let response = await servicioService.getById(id_servicio);
        if (response.status) {
            res.status(200).json(response);
        } else {
            res.status(404).json(response);
        }
    } catch (error) {
        next(error);
    }
}

const updateServicio = async (req, res, next) => {
    try {
        const { id_servicio } = req.params;
        const { nom, fecha_creacion } = req.body;
        let response = await servicioService.update(id_servicio, nom, fecha_creacion);
        if (response.status) {
            res.status(200).json(response);
        } else {
            res.status(404).json(response);
        }
    } catch (error) {
        next(error);
    }
}

const deleteServicio = async (req, res, next) => {
    try {
        const { id_servicio } = req.params;
        let response = await servicioService.delete(id_servicio);
        if (response.status) {
            res.status(200).json(response);
        } else {
            res.status(404).json(response);
        }
    } catch (error) {
        next(error);
    }
}

const getServicios = async (req, res, next) => {
    try {
        let response = await servicioService.getAll();
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

export { createServicio, getServicioById, updateServicio, deleteServicio, getServicios };
