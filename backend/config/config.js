import dotenv  from 'dotenv';
dotenv.config();

const config = {
    port: process.env.PORT_DB,
    host: process.env.HOST,
    user: process.env.USERNAME1,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    typeCast: function (field, next) {
        if (field.type === 'NEWDECIMAL' || field.type === 'DECIMAL') {
            return parseFloat(field.string());
        }
        return next();
    }
};

export { config };