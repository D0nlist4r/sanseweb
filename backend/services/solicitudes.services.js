// services/solicitudes.services.js
import boom from '@hapi/boom';
import connection from '../database/index.js';

class SolicitudService {
    constructor() {}

    create(id_usuario, id_servicio, fecha_registro, gestionada, respuesta) {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO solicitudes_servicios (id_usuario, id_servicio, fecha_registro, gestionada, respuesta) VALUES (?, ?, ?, ?, ?)`;
            const values = [id_usuario, id_servicio, fecha_registro, gestionada, respuesta];
            connection.query(query, values, (err, result) => {
                if (err) {
                    reject(boom.badRequest('Error creando solicitud', err));
                } else {
                    resolve({
                        status: true,
                        message: 'Solicitud creada correctamente',
                        data: result
                    });
                }
            });
        });
    }

    getById(id_solicitud) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM solicitudes_servicios WHERE id_solicitud = ?`;
            const values = [id_solicitud];
            connection.query(query, values, (err, result) => {
                if (err) {
                    reject(boom.badRequest('Error obteniendo solicitud', err));
                } else {
                    if (result.length === 0) {
                        resolve({
                            status: false,
                            message: 'Solicitud no encontrada'
                        });
                    } else {
                        resolve({
                            status: true,
                            message: 'Solicitud encontrada',
                            data: result[0]
                        });
                    }
                }
            });
        });
    }

    update(id_solicitud, gestionada, respuesta) {
        return new Promise((resolve, reject) => {
            const query = `UPDATE solicitudes_servicios SET gestionada = ?, respuesta = ? WHERE id_solicitud = ?`;
            const values = [gestionada, respuesta, id_solicitud];
            connection.query(query, values, (err, result) => {
                if (err) {
                    reject(boom.badRequest('Error actualizando solicitud', err));
                } else {
                    resolve({
                        status: true,
                        message: 'Solicitud actualizada correctamente',
                        data: result
                    });
                }
            });
        });
    }

    delete(id_solicitud) {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM solicitudes_servicios WHERE id_solicitud = ?`;
            const values = [id_solicitud];
            connection.query(query, values, (err, result) => {
                if (err) {
                    reject(boom.badRequest('Error eliminando solicitud', err));
                } else {
                    resolve({
                        status: true,
                        message: 'Solicitud eliminada correctamente',
                        data: result
                    });
                }
            });
        });
    }

    getAll() {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM solicitudes_servicios`;
            connection.query(query, (err, result) => {
                if (err) {
                    reject(boom.badRequest('Error obteniendo solicitudes', err));
                } else {
                    resolve({
                        status: true,
                        message: 'Solicitudes obtenidas correctamente',
                        data: result
                    });
                }
            });
        });
    }
}

export default SolicitudService;
