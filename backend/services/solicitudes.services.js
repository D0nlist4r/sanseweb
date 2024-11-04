// services/solicitudes.services.js
import boom from '@hapi/boom';
import connection from '../database/index.js';

class SolicitudService {
    constructor() { }


    /**
    * Busca solicitudes en la tabla 'solicitudes_servicios' con parámetros opcionales.
    * @param {Array} selectFields - Campos a retornar en el SELECT. Por defecto, ['*'].
    * @param {Object} whereConditions - Condiciones de búsqueda en formato clave-valor. Por defecto, {} (sin condiciones).
    * @param {String} orderBy - Cláusula ORDER BY. Por defecto, '' (sin ordenamiento).
    * @param {Number} limit - Límite de resultados. Por defecto, null (sin límite).
    * @returns {Promise} - Promesa que resuelve con los resultados de la consulta.
    */
    findInTable(selectFields = ['*'], whereConditions = {}, orderBy = '', limit = null) {
        return new Promise((resolve, reject) => {
            // Construir la cláusula SELECT
            const fields = selectFields.join(', ');
            // Construir la cláusula WHERE
            let whereClause = '';
            let values = [];
            if (Object.keys(whereConditions).length > 0) {
                const whereParts = [];
                for (const key in whereConditions) {
                    const value = whereConditions[key];
                    if (Array.isArray(value)) {
                        const placeholders = value.map(() => '?').join(', ');
                        whereParts.push(`${key} IN (${placeholders})`);
                        values.push(...value);
                    } else {
                        whereParts.push(`${key} = ?`);
                        values.push(value);
                    }
                }
                whereClause = 'WHERE ' + whereParts.join(' AND ');
            }
            // Construir la cláusula ORDER BY
            const orderByClause = orderBy ? `ORDER BY ${orderBy}` : '';
            // Construir la cláusula LIMIT
            const limitClause = limit ? `LIMIT ${limit}` : '';
            // Construir la consulta completa
            const query = `SELECT ${fields} FROM solicitudes_servicios ${whereClause} ${orderByClause} ${limitClause}`;
            connection.query(query, values, (err, result) => {
                if (err) {
                    reject(boom.badRequest('Error buscando solicitudes', err));
                } else {
                    resolve({
                        status: true,
                        message: 'Solicitudes encontradas correctamente',
                        data: result
                    });
                }
            });
        });
    }



    findSolicitudes(whereConditions) {
        return new Promise((resolve, reject) => {
            let whereClause = '';
            let values = [];

            if (Object.keys(whereConditions).length > 0) {
                const whereParts = [];
                for (const key in whereConditions) {
                    const value = whereConditions[key];
                    if (Array.isArray(value)) {
                        const placeholders = value.map(() => '?').join(', ');
                        whereParts.push(`${key} IN (${placeholders})`);
                        values.push(...value);
                    } else if (typeof value === 'object' && value.$gte) {
                        whereParts.push(`${key} >= ?`);
                        values.push(value.$gte);
                    } else {
                        whereParts.push(`${key} = ?`);
                        values.push(value);
                    }
                }
                whereClause = 'WHERE ' + whereParts.join(' AND ');
            }

            const query = `SELECT * FROM solicitudes_servicios ${whereClause}`;

            connection.query(query, values, (err, result) => {
                if (err) {
                    reject(boom.badRequest('Error buscando solicitudes', err));
                } else {
                    resolve(result);
                }
            });
        });
    }


    getPendingSolicitudesCount() {
        return new Promise((resolve, reject) => {
            const query = `SELECT COUNT(*) AS count FROM solicitudes_servicios WHERE gestionada = 0 AND visible = 1`;
            connection.query(query, (err, result) => {
                if (err) {
                    reject(boom.badRequest('Error obteniendo el conteo de solicitudes', err));
                } else {
                    resolve(result[0].count);
                }
            });
        });
    }


    updateByCriterio(searchData, updateData) {
        return new Promise((resolve, reject) => {
            // Construir la cláusula WHERE a partir de searchData
            const whereClauses = [];
            const whereValues = [];
            for (const key in searchData) {
                if (Array.isArray(searchData[key])) {
                    const placeholders = searchData[key].map(() => '?').join(', ');
                    whereClauses.push(`${key} IN (${placeholders})`);
                    whereValues.push(...searchData[key]);
                } else {
                    whereClauses.push(`${key} = ?`);
                    whereValues.push(searchData[key]);
                }
            }
            const whereClause = whereClauses.join(' AND ');

            // Construir la cláusula SET a partir de updateData
            const setClauses = [];
            const setValues = [];
            for (const key in updateData) {
                setClauses.push(`${key} = ?`);
                setValues.push(updateData[key]);
            }
            const setClause = setClauses.join(', ');

            const query = `UPDATE solicitudes_servicios SET ${setClause} WHERE ${whereClause}`;
            const values = [...setValues, ...whereValues];

            connection.query(query, values, (err, result) => {
                if (err) {
                    reject(boom.badRequest('Error actualizando solicitudes', err));
                } else {
                    resolve({
                        status: true,
                        message: 'Solicitudes actualizadas correctamente',
                        data: result
                    });
                }
            });
        });
    }

    create(data) {
        return new Promise((resolve, reject) => {
            const fecha_registro = new Date().toISOString().slice(0, 19).replace('T', ' ');
            const { id_usuario, id_servicio } = data;
            const gestionada = 0; // Por defecto, 0 (pendiente)
            const respuesta = null; // Por defecto, null
            const query = `
            INSERT INTO solicitudes_servicios (id_usuario, id_servicio, fecha_registro, gestionada, respuesta)
            VALUES (?, ?, ?, ?, ?)`;
            const values = [id_usuario, id_servicio, fecha_registro, gestionada, respuesta];
            connection.query(query, values, (err, result) => {
                if (err) {
                    reject(boom.badRequest('Error creando solicitud', err));
                } else {
                    resolve({
                        status: true,
                        message: 'Solicitud creada correctamente',
                        data: result,
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

    updateMultiple(ids, gestionada) {
        return new Promise((resolve, reject) => {
            const query = `UPDATE solicitudes_servicios SET gestionada = ? WHERE id_solicitud IN (?)`;
            const values = [gestionada, ids];
            connection.query(query, values, (err, result) => {
                if (err) {
                    reject(boom.badRequest('Error actualizando solicitudes', err));
                } else {
                    resolve({
                        status: true,
                        message: 'Solicitudes actualizadas correctamente',
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
