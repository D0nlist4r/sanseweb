import express from 'express';
import { register, login } from "../controllers/authControllers.js";
import { createUserSchema, updateUserSchema, getUserSchema, loginUserSchema } from '../schemas/users.schema.js';
import validatorHandler from '../middleware/validator.handler.js';
const router = express.Router();

router.post("/register",validatorHandler(createUserSchema, 'body'), register);
router.post("/login", validatorHandler(loginUserSchema, 'body'), login);

export default router;