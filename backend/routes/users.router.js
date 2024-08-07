import express from 'express';
const router = express.Router();
import validatorHandler from '../middleware/validator.handler.js';
import authHandler from '../middleware/auth.handler.js';
import validatePermissionsUser from '../middleware/permissions.handler.js';
import { getInfoUser, createUser, updateUser, deleteUser, getUsers } from '../controllers/userControllers.js';
import { createUserSchema, updateUserSchema, getUserSchema } from '../schemas/users.schema.js';

// crea una ruta para obtener la inforacion de los usuarios (get-users), pero solo creala para que retorne un hola

router.get(
    '/get-info-users',
    authHandler,
    validatePermissionsUser,
    getUsers
);

router.get(
    '/get-info/:idUser',
    authHandler,
    validatorHandler(getUserSchema, 'params'),
    getInfoUser
);

router.post(
    '/create',
    validatorHandler(createUserSchema, 'body'),
    createUser
);

router.patch(
    '/update/:idUser',
    authHandler,
    validatorHandler(getUserSchema, 'params'),
    validatorHandler(updateUserSchema, 'body'),
    updateUser
);

router.delete(
    '/delete/:idUser',
    authHandler,
    validatorHandler(getUserSchema, 'params'),
    deleteUser
);

export default router;
