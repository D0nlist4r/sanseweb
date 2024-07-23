import express from 'express';
import dotenv  from 'dotenv';
dotenv.config();
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import routerApi from './routes/index.js';
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
    }
};

app.use(cookieParser())
app.use(cors(options));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

routerApi(app);
app.use(logErrors);
app.use(errorHandler);
app.use(boomErrorhandler);

/* app.get('/', function(request, response) {
	// Render login template
	const loginPath = path.join(__dirname, '../frontend/src/login.html');
    // Enviar el archivo login.html como respuesta
    response.sendFile(loginPath);
}); */

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});