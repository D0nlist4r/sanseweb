// controllers/solicitudesController.js
import SolicitudService from '../services/solicitudes.services.js';
const solicitudService = new SolicitudService();

const createSolicitud = async (req, res, next) => {
    try {
        const { id_usuario, id_servicio, fecha_registro, gestionada, respuesta } = req.body;
        let response = await solicitudService.create(id_usuario, id_servicio, fecha_registro, gestionada, respuesta);
        res.json(response);
    } catch (error) {
        next(error);
    }
}

const getSolicitudById = async (req, res, next) => {
    try {
        const { id_solicitud } = req.params;
        let response = await solicitudService.getById(id_solicitud);
        if (response.status) {
            res.status(200).json(response);
        } else {
            res.status(404).json(response);
        }
    } catch (error) {
        next(error);
    }
}

const updateSolicitud = async (req, res, next) => {
    try {
        const { id_solicitud } = req.params;
        const { gestionada, respuesta } = req.body;
        let response = await solicitudService.update(id_solicitud, gestionada, respuesta);
        if (response.status) {
            res.status(200).json(response);
        } else {
            res.status(404).json(response);
        }
    } catch (error) {
        next(error);
    }
}

const deleteSolicitud = async (req, res, next) => {
    try {
        const { id_solicitud } = req.params;
        let response = await solicitudService.delete(id_solicitud);
        if (response.status) {
            res.status(200).json(response);
        } else {
            res.status(404).json(response);
        }
    } catch (error) {
        next(error);
    }
}

const getSolicitudes = async (req, res, next) => {
    try {
        let response = await solicitudService.getAll();
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

export { createSolicitud, getSolicitudById, updateSolicitud, deleteSolicitud, getSolicitudes };
