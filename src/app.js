import express from "express";
import MongoStore from "connect-mongo";
import indexRouter from "./routes/index.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import env from "./config/env.js";
import bodyParser from "body-parser";
import { __dirname } from "./path.js";
import { addLogger, appLogger } from "./utils/logger.js";
import MongoSingleton from "./config/db.js";


const app = express();

app.use(cookieParser());
app.use(
  cors({
    origin: ["https://btct7znt-5173.brs.devtunnels.ms","https://jl4bm6kt-3000.brs.devtunnels.ms","https://aerotactico-tandil.shop"],
    credentials: true,
  }),
);

app.use(bodyParser.json());
//PUBLIC
app.use(express.static(__dirname + "/public"));

//SESSION
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: env.mongoUrl,
    }),
    secret: env.secret,
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(addLogger);

app.use(indexRouter);

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
  connectMongo();
});
