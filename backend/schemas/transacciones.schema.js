// schemas/transacciones.schema.js
import Joi from 'joi';

const createTransaccionSchema = Joi.object({
    id_servicio: Joi.number().integer().required(),
    id_usuario: Joi.string().required(),
    accion: Joi.number().integer().valid(0, 1).required().messages({
        'any.only': 'Acción debe ser 0 (resta) o 1 (incremento)'
    }),
    valor: Joi.number().precision(2).positive().required(),
});

const updateTransaccionSchema = Joi.object({
    cod_registro: Joi.number().integer().required(),
    id_servicio: Joi.number().integer(),
    id_usuario: Joi.string(),
    accion: Joi.number().integer().valid(0, 1).messages({
        'any.only': 'Acción debe ser 0 (resta) o 1 (incremento)'
    }),
    valor: Joi.number().precision(2).positive(),
});

const getTransaccionSchema = Joi.object({
    cod_registro: Joi.number().integer().required(),
});

export { createTransaccionSchema, updateTransaccionSchema, getTransaccionSchema };
