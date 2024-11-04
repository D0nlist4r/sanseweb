// schemas/novedades.schema.js
import Joi from 'joi';

const id_usuario = Joi.string().guid({
    version: ['uuidv4']
}).required();
const id_novedad = Joi.number().integer().required();
const limit = Joi.number().integer().min(1).max(100).default(10);
const offset = Joi.number().integer().min(0).default(0);

const getNovedadesByUserSchema = Joi.object({
    id_usuario: id_usuario,
});

const getNovedadesByUserQuerySchema = Joi.object({
    limit: limit,
    offset: offset,
});

const markNovedadAsReadSchema = Joi.object({
    id_novedad: id_novedad,
});

export { getNovedadesByUserSchema, getNovedadesByUserQuerySchema, markNovedadAsReadSchema };
