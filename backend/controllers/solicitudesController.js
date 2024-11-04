// controllers/solicitudesController.js
import SolicitudService from '../services/solicitudes.services.js';
import UsersService from '../services/users.services.js';
import ServiciosService from '../services/servicios.services.js';
const solicitudService = new SolicitudService();
const usersService = new UsersService();
const serviciosService = new ServiciosService();

const createSolicitud = async (req, res, next) => {
    try {
        const { id_usuario, id_servicio } = req.body;
        // Calcular la fecha de hace 30 días
        const fechaHace30Dias = new Date();
        fechaHace30Dias.setDate(fechaHace30Dias.getDate() - 30);
        const fechaHace30DiasStr = fechaHace30Dias.toISOString().slice(0, 19).replace('T', ' ');
        // Buscar solicitudes del mismo usuario y servicio en los últimos 30 días
        const whereConditions = {
            id_usuario: id_usuario,
            id_servicio: id_servicio,
            fecha_registro: { $gte: fechaHace30DiasStr },
            gestionada: [0, 2], // Pendiente o Aceptada
        };
        const existingSolicitudes = await solicitudService.findSolicitudes(whereConditions);
        if (existingSolicitudes.length > 0) {
            return res.status(400).json({
                status: false,
                message: 'Ya tienes una solicitud similar en los últimos 30 días que.',
            });
        }
        // Crear la nueva solicitud
        const response = await solicitudService.create({ id_usuario, id_servicio });
        res.status(201).json(response);
    } catch (error) {
        next(error);
    }
};

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

const getPendingSolicitudesCount = async (req, res, next) => {
    try {
        let response = await solicitudService.findInTable(['COUNT(*) AS count'], { gestionada: 0, visible: 1 });
        res.status(200).json({
            status: true,
            count: response.data[0].count,
        });
    } catch (error) {
        next(error);
    }
};


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


const updateMultipleSolicitudes = async (req, res, next) => {
    try {
        let { ids, gestionada } = req.body;
        const fechaActualizacion = new Date().toISOString().slice(0, 19).replace('T', ' ');
        let visible = 1; // Por defecto, visible permanece en 1
        // Si la solicitud es rechazada, visible se establece en 0
        if (gestionada === 1) {
            visible = 0;
        }
        let updateData = {
            gestionada: gestionada,
            fecha_actualizacion: fechaActualizacion,
            visible: visible
        };
        ids = { id_solicitud: ids };
        let responseActualizacion = await solicitudService.updateByCriterio(ids, updateData);
        res.status(200).json(responseActualizacion);
    } catch (error) {
        next(error);
    }
};

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
        let solicitudes = response.data;
        let newResponse = [];
        for (let solicitud of solicitudes) {
            // se consulta el nombre del usuario
            let userResponse = await usersService.getInfo(solicitud.id_usuario);
            let nombreUsuario = userResponse.data[0].nombres;
            // se consutla el nombre del servicio
            let servicioResponse = await serviciosService.getById(solicitud.id_servicio);
            let nombreServicio = servicioResponse.data.nom;
            // devolver la fecha en formato YYYY-MM-DD HH:MM:SS
            solicitud.fecha_registro = new Date(solicitud.fecha_registro).toISOString().slice(0, 19).replace('T', ' ');
            let newSolicitud = { ...solicitud, nombreUsuario, nombreServicio };
            newResponse.push(newSolicitud);
        }
        response.data = newResponse;
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

export { createSolicitud, getSolicitudById, updateSolicitud, getPendingSolicitudesCount, deleteSolicitud, getSolicitudes, updateMultipleSolicitudes };
