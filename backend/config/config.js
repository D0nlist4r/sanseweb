import dotenv  from 'dotenv';
dotenv.config();

const config = {
    host: process.env.HOST,
    user: process.env.USERNAME1,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
};

export { config };