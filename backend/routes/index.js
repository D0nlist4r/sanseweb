// routes/index.js
import express from 'express';
const router = express.Router();
import usersRouter from './users.router.js';
import authRouter from './auth.router.js';
import serviciosRouter from './servicios.router.js';
import solicitudesRouter from './solicitudes.router.js';
import serviciosUsuariosRouter from './serviciosUsuarios.router.js';
import novedadesRouter from './novedades.router.js';
import transaccionesRouter from './transacciones.router.js';

function routerApi (app){
    app.use('/api/v1', router)
    router.use('/auth', authRouter);
    router.use('/users', usersRouter)
    router.use('/servicios', serviciosRouter);
    router.use('/solicitudes', solicitudesRouter);
    router.use('/servicios-usuarios', serviciosUsuariosRouter);
    router.use('/transacciones', transaccionesRouter);
    router.use('/novedades', novedadesRouter);
}

export default routerApi;
