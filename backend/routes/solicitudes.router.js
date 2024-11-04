// routes/solicitudes.router.js
import express from 'express';
const router = express.Router();
import validatorHandler from '../middleware/validator.handler.js';
import authHandler from '../middleware/auth.handler.js';
import validatePermissionsUser from '../middleware/permissions.handler.js';
import { createSolicitudSchema, updateSolicitudSchema, getSolicitudSchema } from '../schemas/solicitudes.schema.js';
import { createSolicitud, getSolicitudById, updateSolicitud, deleteSolicitud, getSolicitudes, getPendingSolicitudesCount, updateMultipleSolicitudes } from '../controllers/solicitudesController.js';

router.get(
    '/count',
    authHandler,
    validatePermissionsUser, // Middleware para verificar si es admin
    getPendingSolicitudesCount
);

router.get(
    '/',
    authHandler,
    validatePermissionsUser,
    getSolicitudes
);

router.get(
    '/:id_solicitud',
    authHandler,
    validatorHandler(getSolicitudSchema, 'params'),
    getSolicitudById
);

router.post(
    '/',
    authHandler,
    validatorHandler(createSolicitudSchema, 'body'),
    createSolicitud
);


router.patch(
    '/update-multiple',
    authHandler,
    updateMultipleSolicitudes
);

router.patch(
    '/:id_solicitud',
    authHandler,
    validatorHandler(getSolicitudSchema, 'params'),
    validatorHandler(updateSolicitudSchema, 'body'),
    updateSolicitud
);

router.delete(
    '/:id_solicitud',
    authHandler,
    validatorHandler(getSolicitudSchema, 'params'),
    deleteSolicitud
);

export default router;
