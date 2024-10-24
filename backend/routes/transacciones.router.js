// routes/transacciones.router.js
import express from 'express';
const router = express.Router();
import validatorHandler from '../middleware/validator.handler.js';
import authHandler from '../middleware/auth.handler.js';
import validatePermissionsUser from '../middleware/permissions.handler.js';
import { createTransaccionSchema, updateTransaccionSchema, getTransaccionSchema } from '../schemas/transacciones.schema.js';
import { createTransaccion, getTransaccionById, updateTransaccion, deleteTransaccion, getTransacciones } from '../controllers/transaccionesController.js';

router.get(
    '/',
    authHandler,
    validatePermissionsUser,
    getTransacciones
);

router.get(
    '/:cod_registro',
    authHandler,
    validatorHandler(getTransaccionSchema, 'params'),
    getTransaccionById
);

router.post(
    '/',
    authHandler,
    validatePermissionsUser,
    validatorHandler(createTransaccionSchema, 'body'),
    createTransaccion
);

router.patch(
    '/:cod_registro',
    authHandler,
    validatePermissionsUser,
    validatorHandler(getTransaccionSchema, 'params'),
    validatorHandler(updateTransaccionSchema, 'body'),
    updateTransaccion
);

router.delete(
    '/:cod_registro',
    authHandler,
    validatePermissionsUser,
    validatorHandler(getTransaccionSchema, 'params'),
    deleteTransaccion
);

export default router;
