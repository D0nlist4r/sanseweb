// services/transacciones.services.js
import boom from '@hapi/boom';
import connection from '../database/index.js';

class TransaccionService {
    constructor() {}

    create(id_servicio, id_usuario, accion, valor) {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO facel_transacciones (id_servicio, id_usuario, accion, valor) VALUES (?, ?, ?, ?)`;
            const values = [id_servicio, id_usuario, accion, valor];
            connection.query(query, values, (err, result) => {
                if (err) {
                    reject(boom.badRequest('Error creando transacción', err));
                } else {
                    resolve({
                        status: true,
                        message: 'Transacción creada correctamente',
                        data: result
                    });
                }
            });
        });
    }

    getById(cod_registro) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM facel_transacciones WHERE cod_registro = ?`;
            const values = [cod_registro];
            connection.query(query, values, (err, result) => {
                if (err) {
                    reject(boom.badRequest('Error obteniendo transacción', err));
                } else {
                    if (result.length === 0) {
                        resolve({
                            status: false,
                            message: 'Transacción no encontrada'
                        });
                    } else {
                        resolve({
                            status: true,
                            message: 'Transacción encontrada',
                            data: result[0]
                        });
                    }
                }
            });
        });
    }

    update(cod_registro, data) {
        return new Promise((resolve, reject) => {
            const fields = [];
            const values = [];
            for (const [key, value] of Object.entries(data)) {
                fields.push(`${key} = ?`);
                values.push(value);
            }
            values.push(cod_registro);
            const query = `UPDATE facel_transacciones SET ${fields.join(', ')} WHERE cod_registro = ?`;
            connection.query(query, values, (err, result) => {
                if (err) {
                    reject(boom.badRequest('Error actualizando transacción', err));
                } else {
                    resolve({
                        status: true,
                        message: 'Transacción actualizada correctamente',
                        data: result
                    });
                }
            });
        });
    }

    delete(cod_registro) {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM facel_transacciones WHERE cod_registro = ?`;
            const values = [cod_registro];
            connection.query(query, values, (err, result) => {
                if (err) {
                    reject(boom.badRequest('Error eliminando transacción', err));
                } else {
                    resolve({
                        status: true,
                        message: 'Transacción eliminada correctamente',
                        data: result
                    });
                }
            });
        });
    }

    getAll() {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM facel_transacciones`;
            connection.query(query, (err, result) => {
                if (err) {
                    reject(boom.badRequest('Error obteniendo transacciones', err));
                } else {
                    resolve({
                        status: true,
                        message: 'Transacciones obtenidas correctamente',
                        data: result
                    });
                }
            });
        });
    }
}

export default TransaccionService;
