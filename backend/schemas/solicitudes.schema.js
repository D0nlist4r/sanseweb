// schemas/solicitudes.schema.js
import Joi from 'joi';

const createSolicitudSchema = Joi.object({
    id_usuario: Joi.string().required(),
    id_servicio: Joi.number().integer().required(),
    fecha_registro: Joi.date().required(),
    gestionada: Joi.number().integer().valid(0, 1).default(0),
    respuesta: Joi.number().integer().allow(null)
});

const updateSolicitudSchema = Joi.object({
    id_solicitud: Joi.number().integer().required(),
    gestionada: Joi.number().integer().valid(0, 1),
    respuesta: Joi.number().integer().allow(null)
});

const getSolicitudSchema = Joi.object({
    id_solicitud: Joi.number().integer().required(),
});

export { createSolicitudSchema, updateSolicitudSchema, getSolicitudSchema };
