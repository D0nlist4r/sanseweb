// routes/index.js
import express from 'express';
const router = express.Router();
import usersRouter from './users.router.js';
import authRouter from './auth.router.js';
import serviciosRouter from './servicios.router.js';
import solicitudesRouter from './solicitudes.router.js';
import serviciosUsuariosRouter from './serviciosUsuarios.router.js';

function routerApi (app){
    app.use('/api/v1', router)
    router.use('/users', usersRouter)
    router.use('/auth', authRouter);
    router.use('/servicios', serviciosRouter);
    router.use('/solicitudes', solicitudesRouter);
    router.use('/servicios-usuarios', serviciosUsuariosRouter);
}

export default routerApi;
