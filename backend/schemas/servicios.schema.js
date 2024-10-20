// schemas/servicios.schema.js
import Joi from 'joi';

const createServicioSchema = Joi.object({
    nom: Joi.string().min(3).max(100).required(),
    fecha_creacion: Joi.date().required(),
});

const updateServicioSchema = Joi.object({
    id_servicio: Joi.number().integer().required(),
    nom: Joi.string().min(3).max(100),
    fecha_creacion: Joi.date(),
});

const getServicioSchema = Joi.object({
    id_servicio: Joi.number().integer().required(),
});

export { createServicioSchema, updateServicioSchema, getServicioSchema };
