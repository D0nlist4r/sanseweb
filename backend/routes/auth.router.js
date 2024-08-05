import express from 'express';
import { register, login, logout } from "../controllers/authControllers.js";
import { createUserSchema, loginUserSchema } from '../schemas/users.schema.js';
import validatorHandler from '../middleware/validator.handler.js';
import authenticateToken from '../middleware/auth.handler.js';
const router = express.Router();

router.post("/register", validatorHandler(createUserSchema, 'body'), register);
router.post("/login", validatorHandler(loginUserSchema, 'body'), login);
// ruta para cerrar la sesion
router.get("/logout", logout);
router.post("/verify", authenticateToken, (req, res) => {
    res.status(200).json({ status:true, message: 'Token verificado', user: req.session.user });
});

export default router;