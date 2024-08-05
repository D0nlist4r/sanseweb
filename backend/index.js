import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import routerApi from './routes/index.js';
import session from 'express-session';
import { logErrors, errorHandler, boomErrorhandler } from './middleware/error.handler.js';

const port = process.env.PORT;
const app = express();
const whitelist = ["http://localhost:3001", "http://localhost:8080"];
const options = {
    origin: (origin, callback) => {
        if (whitelist.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('no permitido'));
        }
    },
    credentials: true // Habilita el uso de credenciales
};

app.use(cookieParser())
app.use(cors(options));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    secret: process.env.JWT_SECRET, // Cambia esto por una clave secreta real
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.ENV === 'production' ? true : false } // Asegúrate de usar `secure: true` si estás usando HTTPS
}));

routerApi(app);
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', whitelist);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.use(logErrors);
app.use(errorHandler);
app.use(boomErrorhandler);

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});