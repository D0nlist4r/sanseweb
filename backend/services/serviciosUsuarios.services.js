// services/serviciosUsuarios.services.js
import boom from '@hapi/boom';
import connection from '../database/index.js';

class ServicioUsuarioService {
    constructor() {}

    create(id_servicio, id_usuario, fecha_registro) {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO servicios_usuarios (id_servicio, id_usuario, fecha_registro) VALUES (?, ?, ?)`;
            const values = [id_servicio, id_usuario, fecha_registro];
            connection.query(query, values, (err, result) => {
                if (err) {
                    reject(boom.badRequest('Error creando servicio_usuario', err));
                } else {
                    resolve({
                        status: true,
                        message: 'ServicioUsuario creado correctamente',
                        data: result
                    });
                }
            });
        });
    }

    getById(cod_registro) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM servicios_usuarios WHERE cod_registro = ?`;
            const values = [cod_registro];
            connection.query(query, values, (err, result) => {
                if (err) {
                    reject(boom.badRequest('Error obteniendo servicio_usuario', err));
                } else {
                    if (result.length === 0) {
                        resolve({
                            status: false,
                            message: 'ServicioUsuario no encontrado'
                        });
                    } else {
                        resolve({
                            status: true,
                            message: 'ServicioUsuario encontrado',
                            data: result[0]
                        });
                    }
                }
            });
        });
    }

    update(cod_registro, id_servicio, id_usuario, fecha_registro) {
        return new Promise((resolve, reject) => {
            const query = `UPDATE servicios_usuarios SET id_servicio = ?, id_usuario = ?, fecha_registro = ? WHERE cod_registro = ?`;
            const values = [id_servicio, id_usuario, fecha_registro, cod_registro];
            connection.query(query, values, (err, result) => {
                if (err) {
                    reject(boom.badRequest('Error actualizando servicio_usuario', err));
                } else {
                    resolve({
                        status: true,
                        message: 'ServicioUsuario actualizado correctamente',
                        data: result
                    });
                }
            });
        });
    }

    delete(cod_registro) {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM servicios_usuarios WHERE cod_registro = ?`;
            const values = [cod_registro];
            connection.query(query, values, (err, result) => {
                if (err) {
                    reject(boom.badRequest('Error eliminando servicio_usuario', err));
                } else {
                    resolve({
                        status: true,
                        message: 'ServicioUsuario eliminado correctamente',
                        data: result
                    });
                }
            });
        });
    }

    getAll() {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM servicios_usuarios`;
            connection.query(query, (err, result) => {
                if (err) {
                    reject(boom.badRequest('Error obteniendo servicios_usuarios', err));
                } else {
                    resolve({
                        status: true,
                        message: 'ServiciosUsuarios obtenidos correctamente',
                        data: result
                    });
                }
            });
        });
    }



    getServiciosPorUsuario(idUsuario){
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM servicios_usuarios WHERE id_usuario = ?`;
            const values = [idUsuario];
            connection.query(query, values, (err, result) => {
                if (err) {
                    reject(boom.badRequest('Error obteniendo servicios_usuarios', err));
                } else {
                    resolve({
                        status: true,
                        message: 'ServiciosUsuarios obtenidos correctamente',
                        data: result
                    });
                }
            });
        });
    }
}

export default ServicioUsuarioService;
