const boom = require('@hapi/boom');
let connection = require('../database/index');

class UserService {
    constructor() {
    }

    create(nombres, contraseña, usuario, email, telefono, fecha_creacion) {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO seguridad_usuarios (nombres, contraseña, usuario, email, telefono, fecha_creacion) VALUES (?, ?, ?, ?, ?, ?)`;
            const values = [nombres, contraseña, usuario, email, telefono, fecha_creacion];
            connection.query(query, values, (err, result) => {
                if (err) {
                    reject(boom.badRequest('Error en la creación del usuario', err));
                } else {
                    resolve({
                        status: true,
                        message: 'Usuario creado correctamente',
                        data: result
                    });
                }
            });
        });
    }

    find() {
        return this.products;
    }

    findOne(id) {
        return this.products.find(item => item.id === id)
    }

    update() { }

    delete() { }
}

module.exports = UserService;