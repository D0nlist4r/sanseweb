// controllers/serviciosUsuariosController.js
import ServicioUsuarioService from '../services/serviciosUsuarios.services.js';
const servicioUsuarioService = new ServicioUsuarioService();

const createServicioUsuario = async (req, res, next) => {
    try {
        const { id_servicio, id_usuario, fecha_registro } = req.body;
        let response = await servicioUsuarioService.create(id_servicio, id_usuario, fecha_registro);
        res.json(response);
    } catch (error) {
        next(error);
    }
}

const getServicioUsuarioById = async (req, res, next) => {
    try {
        const { cod_registro } = req.params;
        let response = await servicioUsuarioService.getById(cod_registro);
        if (response.status) {
            res.status(200).json(response);
        } else {
            res.status(404).json(response);
        }
    } catch (error) {
        next(error);
    }
}

const updateServicioUsuario = async (req, res, next) => {
    try {
        const { cod_registro } = req.params;
        const { id_servicio, id_usuario, fecha_registro } = req.body;
        let response = await servicioUsuarioService.update(cod_registro, id_servicio, id_usuario, fecha_registro);
        if (response.status) {
            res.status(200).json(response);
        } else {
            res.status(404).json(response);
        }
    } catch (error) {
        next(error);
    }
}

const deleteServicioUsuario = async (req, res, next) => {
    try {
        const { cod_registro } = req.params;
        let response = await servicioUsuarioService.delete(cod_registro);
        if (response.status) {
            res.status(200).json(response);
        } else {
            res.status(404).json(response);
        }
    } catch (error) {
        next(error);
    }
}

const getServiciosUsuarios = async (req, res, next) => {
    try {
        let response = await servicioUsuarioService.getAll();
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

export { createServicioUsuario, getServicioUsuarioById, updateServicioUsuario, deleteServicioUsuario, getServiciosUsuarios };
