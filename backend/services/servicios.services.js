// services/servicios.services.js
import boom from '@hapi/boom';
import connection from '../database/index.js';

class ServicioService {
    constructor() {}

    create(nom, fecha_creacion) {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO dgen_servicios (nom, fecha_creacion) VALUES (?, ?)`;
            const values = [nom, fecha_creacion];
            connection.query(query, values, (err, result) => {
                if (err) {
                    reject(boom.badRequest('Error creando servicio', err));
                } else {
                    resolve({
                        status: true,
                        message: 'Servicio creado correctamente',
                        data: result
                    });
                }
            });
        });
    }

    getById(id_servicio) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM dgen_servicios WHERE id_servicio = ?`;
            const values = [id_servicio];
            connection.query(query, values, (err, result) => {
                if (err) {
                    reject(boom.badRequest('Error obteniendo servicio', err));
                } else {
                    if (result.length === 0) {
                        resolve({
                            status: false,
                            message: 'Servicio no encontrado'
                        });
                    } else {
                        resolve({
                            status: true,
                            message: 'Servicio encontrado',
                            data: result[0]
                        });
                    }
                }
            });
        });
    }

    update(id_servicio, nom, fecha_creacion) {
        return new Promise((resolve, reject) => {
            const query = `UPDATE dgen_servicios SET nom = ?, fecha_creacion = ? WHERE id_servicio = ?`;
            const values = [nom, fecha_creacion, id_servicio];
            connection.query(query, values, (err, result) => {
                if (err) {
                    reject(boom.badRequest('Error actualizando servicio', err));
                } else {
                    resolve({
                        status: true,
                        message: 'Servicio actualizado correctamente',
                        data: result
                    });
                }
            });
        });
    }

    delete(id_servicio) {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM dgen_servicios WHERE id_servicio = ?`;
            const values = [id_servicio];
            connection.query(query, values, (err, result) => {
                if (err) {
                    reject(boom.badRequest('Error eliminando servicio', err));
                } else {
                    resolve({
                        status: true,
                        message: 'Servicio eliminado correctamente',
                        data: result
                    });
                }
            });
        });
    }

    getAll() {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM dgen_servicios`;
            connection.query(query, (err, result) => {
                if (err) {
                    reject(boom.badRequest('Error obteniendo servicios', err));
                } else {
                    resolve({
                        status: true,
                        message: 'Servicios obtenidos correctamente',
                        data: result
                    });
                }
            });
        });
    }
}

export default ServicioService;
