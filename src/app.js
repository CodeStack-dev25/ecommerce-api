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
    origin: ["https://aerotactico-tandil.shop", "https://www.aerotactico-tandil.shop", "http://localhost:5173"],
    credentials: true,
  }),
);

app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

// SESSION
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

// ✅ servir la carpeta de docs correctamente
app.use("/docs", express.static(__dirname + "/docs"));

app.get("/", (req, res) => {
  const specUrl = `https://aerotactico.cristiandeveloper.site/docs/openapi.yaml`;

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Documentación API || Ecommerce</title>
        <meta charset="UTF-8"/>
        <style>
          body, html {
            margin: 0;
            padding: 0;
            height: 100%;
            width: 100%;
          }
          rapidoc {
            height: 100vh;
          }
                rapi-doc::part(section-navbar) { /* <<< targets navigation bar */
      background: linear-gradient(90deg, #3d4e70, #2e3746);
    }
        </style>
      </head>
      <body>
        <rapi-doc 
          spec-url="${specUrl}"
          theme="light"
          show-header="false"
          render-style="read"
           allow-try="false"       
          allow-authentication="false"
        >
        </rapi-doc>

        <script type="module" src="https://unpkg.com/rapidoc/dist/rapidoc-min.js"></script>
      </body>
    </html>
  `);
});

async function connectMongo() {
  appLogger.info("Iniciando servicio para MongoDB");
  try {
    await MongoSingleton.getInstance();
  } catch (error) {
    appLogger.error("Error al iniciar MongoDB:", error);
    process.exit(1);
  }
}

const PORT = env.port || 8080;

app.listen(PORT, () => {
  appLogger.http(`Servidor iniciado en PUERTO: ${PORT}`);
  connectMongo();
});
