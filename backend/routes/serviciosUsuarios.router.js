// routes/serviciosUsuarios.router.js
import express from 'express';
const router = express.Router();
import validatorHandler from '../middleware/validator.handler.js';
import authHandler from '../middleware/auth.handler.js';
import validatePermissionsUser from '../middleware/permissions.handler.js';
import { createServicioUsuarioSchema, updateServicioUsuarioSchema, getServicioUsuarioSchema } from '../schemas/serviciosUsuarios.schema.js';
import { createServicioUsuario, getServicioUsuarioById, updateServicioUsuario, deleteServicioUsuario, getServiciosUsuarios } from '../controllers/serviciosUsuariosController.js';

router.get(
    '/',
    authHandler,
    validatePermissionsUser,
    getServiciosUsuarios
);

router.get(
    '/:cod_registro',
    authHandler,
    validatorHandler(getServicioUsuarioSchema, 'params'),
    getServicioUsuarioById
);

router.post(
    '/',
    authHandler,
    validatorHandler(createServicioUsuarioSchema, 'body'),
    createServicioUsuario
);

router.patch(
    '/:cod_registro',
    authHandler,
    validatorHandler(getServicioUsuarioSchema, 'params'),
    validatorHandler(updateServicioUsuarioSchema, 'body'),
    updateServicioUsuario
);

router.delete(
    '/:cod_registro',
    authHandler,
    validatorHandler(getServicioUsuarioSchema, 'params'),
    deleteServicioUsuario
);

export default router;