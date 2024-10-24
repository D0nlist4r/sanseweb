import express from 'express';
import { register, login, logout,updatePassword } from "../controllers/authControllers.js";
import { createUserSchema, loginUserSchema, getUserSchema,updatePasswordSchema} from '../schemas/users.schema.js';
import validatorHandler from '../middleware/validator.handler.js';
import authenticateToken from '../middleware/auth.handler.js';
const router = express.Router();

router.post("/register", validatorHandler(createUserSchema, 'body'), register);
router.post("/login", validatorHandler(loginUserSchema, 'body'), login);
// ruta para actualizar la contraseña
router.patch("/update-password", validatorHandler(updatePasswordSchema, 'body'), updatePassword);
// ruta para cerrar la sesion y se recibe el parametro del id del usuario
router.get("/logout/:idUser", validatorHandler(getUserSchema, 'params'), logout);
router.post("/verify", authenticateToken, (req, res) => {
    res.status(200).json({ status:true, message: 'Token verificado', user: req.session.user });
});

export default router;