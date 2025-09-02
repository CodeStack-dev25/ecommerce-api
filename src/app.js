import express from 'express';
import MongoStore from "connect-mongo";
import indexRouter from './routes/index.routes.js';
//import passport from 'passport';
import session from 'express-session'
//import cookieParser from 'cookie-parser'
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';
import env from './config/env.js';

//import { initPassport } from './config/passport.js';
import { __dirname } from "./path.js"
import { addLogger, appLogger } from './utils/logger.js';
import MongoSingleton from './config/db.js';

import middlewares from "./middlewares/index.js"

const app = express();

//app.use(cookieParser());

//PUBLIC
app.use(express.static(__dirname + "/public"))

//SESSION
app.use(session({
    store: MongoStore.create({
        mongoUrl: env.mongoUrl
    }),
    secret: env.secret,
    resave: false,
    saveUninitialized: false,
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//Middlewares
app.use(middlewares.limit);
app.use(...middlewares.security);
app.use(middlewares.requestL)


//app.use(passport.session());
//initPassport();
//app.use(passport.initialize());

//Swagger Config

const swaggerOptions = {
    definition:{
        openapi:'3.0.1',
        info:{
            title: 'Documentación API E-commerce',
            description: 'Documentacion de E-commerce'
        }
    },
    apis: ['./src/docs/**/*.yaml']
}
const specs = swaggerJsdoc(swaggerOptions)
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

app.use(addLogger);

app.use(indexRouter)

async function connectMongo() {
    appLogger.info("Iniciando servicio para MongoDB");
    try {
        await MongoSingleton.getInstance();
    } catch (error) {
        appLogger.error("Error al iniciar MongoDB:", error);
        process.exit(1);
    }
}

let PORT = env.port || 8080;


app.listen(PORT, () => {
    appLogger.http(`Servidor iniciado en PUERTO: ${PORT}`);
    connectMongo()
});