const Joi = require('joi');

const createUserSchema = Joi.object({
    nombres: Joi.string().min(3).max(50).required(),
    contraseña: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
    usuario: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    telefono: Joi.string().pattern(new RegExp("^[0-9]{10}$")).required(),
    fecha_creacion: Joi.date().required(),
})

const updateUserSchema = Joi.object({
    id_usuario: Joi.number().integer().required(),
    nombres: Joi.string().min(3).max(50).required(),
    contraseña: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
    usuario: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    telefono: Joi.string().pattern(new RegExp("^[0-9]{10}$")).required(),
    fecha_creacion: Joi.date().required(),
    fecha_actualizacion: Joi.date().required(),
    visible: Joi.boolean().required(),
})

const getUserSchema = Joi.object({
    idUser: Joi.number().integer().required(),
})

module.exports = { createUserSchema, updateUserSchema, getUserSchema };