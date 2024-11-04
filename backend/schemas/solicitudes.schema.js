// schemas/solicitudes.schema.js
import Joi from 'joi';

const id_usuario =  Joi.string().guid({
    version: ['uuidv4']
}).required();
const id_servicio = Joi.number().integer().required();

const createSolicitudSchema = Joi.object({
    id_usuario: id_usuario,
    id_servicio: id_servicio,
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
