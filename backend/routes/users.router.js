import express from 'express';
const router = express.Router();
import validatorHandler from '../middleware/validator.handler.js';
import authHandler from '../middleware/auth.handler.js';
import { getInfoUser, createUser, updateUser, deleteUser } from '../controllers/userControllers.js';
import { createUserSchema, updateUserSchema, getUserSchema } from '../schemas/users.schema.js';

router.get(
    '/get-info/:idUser',
    authHandler,
    validatorHandler(getUserSchema, 'params'),
    getInfoUser
)

router.post(
    '/create',
    validatorHandler(createUserSchema, 'body'),
    createUser
)

router.patch(
    '/update/:idUser',
    authHandler,
    validatorHandler(getUserSchema, 'params'),
    validatorHandler(updateUserSchema, 'body'),
    updateUser
)


router.delete(
    '/delete/:idUser',
    authHandler,
    validatorHandler(getUserSchema, 'params'),
    deleteUser
);

export default router;