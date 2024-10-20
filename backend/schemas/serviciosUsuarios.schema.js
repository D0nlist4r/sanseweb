// schemas/serviciosUsuarios.schema.js
import Joi from 'joi';

const createServicioUsuarioSchema = Joi.object({
    id_servicio: Joi.number().integer().required(),
    id_usuario: Joi.string().required(),
    fecha_registro: Joi.date().required(),
});

const updateServicioUsuarioSchema = Joi.object({
    cod_registro: Joi.number().integer().required(),
    id_servicio: Joi.number().integer(),
    id_usuario: Joi.string(),
    fecha_registro: Joi.date(),
});

const getServicioUsuarioSchema = Joi.object({
    cod_registro: Joi.number().integer().required(),
});

export { createServicioUsuarioSchema, updateServicioUsuarioSchema, getServicioUsuarioSchema };
