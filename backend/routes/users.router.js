const express = require('express');
const router = express.Router();
const validatorHandler = require('../middleware/validator.handler');
let userService = require('../services/users.services');
let user = new userService();
const { createUserSchema, updateUserSchema, getUserSchema } = require('../schemas/users.schema');
const e = require('express');

// middleware específico a este router
router.use('/', function (error, req, res, next) {
    if (error) {
        res.status(500).json({ error });
    } else {
        console.log('Hola, soy el middleware')
        next() // se utiliza para que se ejecute el router.get
    }
})

router.get('/get-info/:idUser', validatorHandler(getUserSchema, 'params'), async (req, res, next) => {
    try {
        // query de sumar 2 numeros y e imprimir el resultado en consola
        /*
        res.status(404).json({
            message: 'not found'
        })
        */
        const { idUser } = req.params;
        res.status(200).json({
            idUser
        })
    } catch (error) {
        next(error); //se agrega el next para atrapar de forma explicita el error con el middleware
    }
})

router.post('/create', validatorHandler(createUserSchema, 'body'), async (req, res, next) => {
    try {
        const body = req.body;
        const response = await user.create(body.nombres, body.contraseña, body.usuario, body.email, body.telefono, body.fecha_creacion);
        res.json(response);
    } catch (error) {
        next(error);
    }
})

router.patch('update/:id', validatorHandler(getUserSchema, 'params'), validatorHandler(updateUserSchema, 'body'), async (req, res, next) => {
    try {
        const { id } = req.params;
        const body = req.body;
        res.json({
            message: 'updating partial',
            data: body,
            id,
        })
    } catch (error) {
        next(error); //se agrega el next para atrapar de forma explicita el error con el middleware
    }
})


router.delete('/delete/:id', validatorHandler(getUserSchema, 'params'), async (req, res, next) => {
    try {
        const { id } = req.params;
        res.json({
            message: 'deleting',
            id,
        })
    } catch (error) {
        next(error); //se agrega el next para atrapar de forma explicita el error con el middleware
    }
})



module.exports = router;