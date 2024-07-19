const { logErrors, errorHandler,boomErrorhandler } = require('./middleware/error.handler');
const express = require('express');
const routerApi = require('./routes/index');
const cors = require('cors');
const whitelist = ["http://localhost:3000", "https://myapp.com"];
const options = {
    origin: (origin, callback)=>{
        if(whitelist.includes(origin) || !origin){
            callback(null, true)
        }else{
            callback(new Error('no permitido'));
        }
    }
}
const app = express();
const port = 3001;

app.use(cors(options))
app.use(express.json());


app.get('/', (request, response) => {
    response.send('hello from my server with express')
})

routerApi(app)
// Utilizamos los middleware. Siempre deben ir después del routing:
app.use(logErrors);
app.use(errorHandler);
app.use(boomErrorhandler)

app.listen(port, () => {
    console.log('mi port ', port);
});