// routes/novedades.router.js
import express from 'express';
const router = express.Router();
import authHandler from '../middleware/auth.handler.js';
import validatorHandler from '../middleware/validator.handler.js';
import { getNovedadesByUser, markNovedadAsRead } from '../controllers/novedadesController.js';
import { getNovedadesByUserSchema, markNovedadAsReadSchema,getNovedadesByUserQuerySchema } from '../schemas/novedades.schema.js';

router.get(
    '/user/:id_usuario',
    authHandler,
    validatorHandler(getNovedadesByUserSchema, 'params'),
    validatorHandler(getNovedadesByUserQuerySchema, 'query'),
    getNovedadesByUser
);


router.patch(
    '/:id_novedad/read',
    authHandler,
    validatorHandler(markNovedadAsReadSchema, 'params'),
    markNovedadAsRead
);

export default router;
