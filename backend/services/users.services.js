import boom from '@hapi/boom';
import connection from '../database/index.js';

class UserService {
    constructor() {
    }

    create(nombres, contrasena, usuario, email, telefono, fecha_creacion) {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO seguridad_usuarios (nombres, contrasena, usuario, email, telefono, fecha_creacion) VALUES (?, ?, ?, ?, ?, ?)`;
            const values = [nombres, contrasena, usuario, email, telefono, fecha_creacion];
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

    getInfo(idUser) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM seguridad_usuarios WHERE id_usuario = ?`;
            const values = [idUser];
            connection.query(query, values, (err, result) => {
                if (err) {
                    reject(boom.badRequest('Error en la obtención del usuario', err));
                } else {
                    if (result.length === 0) {
                        resolve({
                            status: false,
                            message: 'Usuario no encontrado'
                        });
                    } else {
                        resolve({
                            status: true,
                            message: 'Usuario encontrado',
                            data: result
                        });
                    }
                }
            });
        });
    }

    update(id_usuario, nombres, contrasena, usuario, email, telefono, fecha_actualizacion) {
        return new Promise((resolve, reject) => {
            const query = `UPDATE seguridad_usuarios SET nombres = ?, contrasena = ?, usuario = ?, email = ?, telefono = ?, fecha_actualizacion = ? WHERE id_usuario = ?`;
            const values = [nombres, contrasena, usuario, email, telefono, fecha_actualizacion, id_usuario];
            connection.query(query, values, (err, result) => {
                if (err) {
                    reject(boom.badRequest('Error en la actualización del usuario', err));
                } else {
                    resolve({
                        status: true,
                        message: 'Usuario actualizado correctamente',
                        data: result
                    });
                }
            });
        });
    }


    deleteUser(id_usuario) {
        return new Promise((resolve, reject) => {
            const query = `UPDATE seguridad_usuarios SET visible = 0 WHERE id_usuario = ?`;
            const values = [id_usuario];
            connection.query(query, values, (err, result) => {
                if (err) {
                    reject(boom.badRequest('Error al eliminar el usuario', err));
                } else {
                    resolve({
                        status: true,
                        message: 'Usuario eliminado correctamente',
                        data: result
                    });
                }
            });
        });
    }

    getUsers() {
        return new Promise((resolve, reject) => {
            const query = `SELECT id_usuario,nombres,usuario,email,telefono,fecha_creacion,fecha_actualizacion,ultimo_login, activo FROM seguridad_usuarios WHERE visible = 1`;
            connection.query(query, (err, result) => {
                if (err) {
                    reject(boom.badRequest('Error en la obtención de los usuarios', err));
                } else {
                    if (result.length === 0) {
                        resolve({
                            status: false,
                            message: 'No hay usuarios registrados'
                        });
                    } else {
                        resolve({
                            status: true,
                            message: 'Usuarios encontrados',
                            data: result
                        });
                    }
                }
            });
        });
    }

    updateStatus(id_usuario, status) {
        return new Promise((resolve, reject) => {
            const query = `UPDATE seguridad_usuarios SET activo = ? WHERE id_usuario = ?`;
            const values = [status, id_usuario];
            connection.query(query, values, (err, result) => {
                if (err) {
                    reject(boom.badRequest('Error en la actualización del usuario', err));
                } else {
                    resolve({
                        status: true,
                        message: 'Usuario actualizado correctamente',
                        data: result
                    });
                }
            });
        });
    }
}

export default UserService;