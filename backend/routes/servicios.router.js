// routes/servicios.router.js
import express from 'express';
const router = express.Router();
import validatorHandler from '../middleware/validator.handler.js';
import authHandler from '../middleware/auth.handler.js';
import validatePermissionsUser from '../middleware/permissions.handler.js';
import { createServicioSchema, updateServicioSchema, getServicioSchema } from '../schemas/servicios.schema.js';
import { createServicio, getServicioById, updateServicio, deleteServicio, getServicios } from '../controllers/serviciosController.js';

router.get(
    '/',
    authHandler,
    validatePermissionsUser,
    getServicios
);

router.get(
    '/:id_servicio',
    authHandler,
    validatorHandler(getServicioSchema, 'params'),
    getServicioById
);

router.post(
    '/',
    authHandler,
    validatePermissionsUser,
    validatorHandler(createServicioSchema, 'body'),
    createServicio
);

router.patch(
    '/:id_servicio',
    authHandler,
    validatePermissionsUser,
    validatorHandler(getServicioSchema, 'params'),
    validatorHandler(updateServicioSchema, 'body'),
    updateServicio
);

router.delete(
    '/:id_servicio',
    authHandler,
    validatePermissionsUser,
    validatorHandler(getServicioSchema, 'params'),
    deleteServicio
);

export default router;
