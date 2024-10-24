import Joi from 'joi';

const createUserSchema = Joi.object({
    nombres: Joi.string().min(3).max(50).required(),
    contrasena: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
    usuario: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    telefono: Joi.string().pattern(new RegExp("^[0-9]{10}$")).required(),
    fecha_creacion: Joi.date().required(),
})

const loginUserSchema = Joi.object({
    email: Joi.string().email().required(),
    contrasena: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
})

const updateUserSchema = Joi.object({
    idUser: Joi.string().guid({
        version: ['uuidv4']
    }).required(),
    nombres: Joi.string().min(3).max(50).required(),
    // contrasena: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
    usuario: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    telefono: Joi.string().pattern(new RegExp("^[0-9]{10}$")).required(),
    fecha_actualizacion: Joi.date().required(),
})

const getUserSchema = Joi.object({
    idUser: Joi.string().guid({
        version: ['uuidv4']
    }).required(),
})
const updatePasswordSchema = Joi.object({
    idUser: Joi.string().guid({
        version: ['uuidv4']
    }).required(),
    contrasena: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
    contrasenaNueva: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
})

export { createUserSchema, updateUserSchema, getUserSchema, loginUserSchema,updatePasswordSchema };