// services/novedades.services.js
import boom from '@hapi/boom';
import connection from '../database/index.js';

class NovedadesService {
    constructor() { }

    /**
     * Busca registros en la tabla 'novedades_usuario' con parámetros opcionales.
     * @param {Array} selectFields - Campos a retornar en el SELECT. Por defecto, ['*'].
     * @param {Object} whereConditions - Condiciones de búsqueda en formato clave-valor. Por defecto, {} (sin condiciones).
     * @param {String} orderBy - Cláusula ORDER BY. Por defecto, '' (sin ordenamiento).
     * @param {Number} limit - Límite de resultados. Por defecto, null (sin límite).
     * @returns {Promise} - Promesa que resuelve con los resultados de la consulta.
     */

    findInTable(selectFields = ['*'], whereConditions = {}, orderBy = '', limit = null, offset = null) {
        return new Promise((resolve, reject) => {
            // Validar y construir los campos seleccionados
            const allowedFields = ['id_novedad', 'fecha_novedad', 'novedad', 'id_usuario', 'leida'];
            const fields = selectFields.filter(field => allowedFields.includes(field)).join(', ');

            if (!fields) {
                return reject(boom.badRequest('Campos de selección inválidos'));
            }

            // Construir la cláusula WHERE
            let whereClause = '';
            let values = [];
            if (Object.keys(whereConditions).length > 0) {
                const whereParts = [];
                for (const key in whereConditions) {
                    const value = whereConditions[key];
                    whereParts.push(`${key} = ?`);
                    values.push(value);
                }
                whereClause = 'WHERE ' + whereParts.join(' AND ');
            }

            // Validar y construir la cláusula ORDER BY
            const allowedOrderFields = ['fecha_novedad', 'id_novedad'];
            let orderByClause = '';
            if (orderBy) {
                const [orderField, orderDirection] = orderBy.split(' ');
                if (allowedOrderFields.includes(orderField) && ['ASC', 'DESC'].includes(orderDirection.toUpperCase())) {
                    orderByClause = `ORDER BY ${orderField} ${orderDirection.toUpperCase()}`;
                } else {
                    return reject(boom.badRequest('Parámetro de ordenamiento inválido'));
                }
            }

            // Construir la cláusula LIMIT y OFFSET
            let limitOffsetClause = '';
            let limitOffsetValues = [];
            if (limit !== null && offset !== null) {
                limitOffsetClause = `LIMIT ? OFFSET ?`;
                limitOffsetValues.push(parseInt(limit), parseInt(offset));
            } else if (limit !== null) {
                limitOffsetClause = `LIMIT ?`;
                limitOffsetValues.push(parseInt(limit));
            }

            // Construir las consultas
            const dataQuery = `SELECT ${fields} FROM novedades_usuario ${whereClause} ${orderByClause} ${limitOffsetClause}`;
            const countQuery = `SELECT COUNT(*) AS total FROM novedades_usuario ${whereClause}`;

            // Ejecutar la consulta de datos
            connection.query(dataQuery, [...values, ...limitOffsetValues], (err, dataResults) => {
                if (err) {
                    return reject(boom.badRequest('Error buscando novedades', err));
                }
                // Ejecutar la consulta de conteo total
                connection.query(countQuery, values, (err, countResults) => {
                    if (err) {
                        return reject(boom.badRequest('Error obteniendo el total de novedades', err));
                    }
                    const total = countResults[0].total;
                    resolve({
                        status: true,
                        message: 'Novedades encontradas correctamente',
                        data: dataResults,
                        total: total,
                    });
                });
            });
        });
    }


    /**
     * Actualiza registros en la tabla 'novedades_usuario' según criterios de búsqueda.
     * @param {Object} searchData - Criterios de búsqueda en formato clave-valor.
     * @param {Object} updateData - Datos a actualizar en formato clave-valor.
     * @returns {Promise} - Promesa que resuelve con el resultado de la actualización.
     */
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

            const query = `UPDATE novedades_usuario SET ${setClause} WHERE ${whereClause}`;
            const values = [...setValues, ...whereValues];

            connection.query(query, values, (err, result) => {
                if (err) {
                    reject(boom.badRequest('Error actualizando novedades', err));
                } else {
                    resolve({
                        status: true,
                        message: 'Novedades actualizadas correctamente',
                        data: result,
                    });
                }
            });
        });
    }

    /**
     * Inserta un nuevo registro en la tabla 'novedades_usuario'.
     * @param {Object} data - Datos a insertar en formato clave-valor.
     * @returns {Promise} - Promesa que resuelve con el resultado de la inserción.
     */
    insertInTable(data) {
        return new Promise((resolve, reject) => {
            const fields = Object.keys(data);
            const values = Object.values(data);
            const placeholders = fields.map(() => '?').join(', ');
            const query = `INSERT INTO novedades_usuario (${fields.join(', ')}) VALUES (${placeholders})`;
            connection.query(query, values, (err, result) => {
                if (err) {
                    reject(boom.badRequest('Error insertando novedad', err));
                } else {
                    resolve({
                        status: true,
                        message: 'Novedad insertada correctamente',
                        data: result,
                    });
                }
            });
        });
    }

    // Puedes agregar más métodos específicos si los necesitas
}

export default NovedadesService;
