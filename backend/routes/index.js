import express from 'express';
const router = express.Router();
import usersRouter from './users.router.js';
import authRouter from './auth.router.js';
function routerApi (app){
    app.use('/api/v1', router)
    router.use('/users', usersRouter)
    router.use('/auth', authRouter);
}

export default routerApi;