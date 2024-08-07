import mysql from 'mysql';
import {config} from '../config/config.js';
const pool = mysql.createPool(config);

const createTable = (schema) => {
    return new Promise((resolve, reject) => {
        pool.query(schema, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

const checkRecordExists = (tableName, column, value) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM ${tableName} WHERE ${column} = ?`;

        pool.query(query, [value], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results.length ? results[0] : null);
            }
        });
    });
};

const insertRecord = (tableName, record) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO ${tableName} SET ?`;

        pool.query(query, [record], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

const updateRecord = (tableName, record, id) => {
    return new Promise((resolve, reject) => {
        const query = `UPDATE ${tableName} SET ? WHERE id_usuario = ?`;

        pool.query(query, [record, id], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

export { createTable, checkRecordExists, insertRecord, updateRecord };