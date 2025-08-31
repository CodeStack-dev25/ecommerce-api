import { connect } from "mongoose";
import { appLogger } from "../utils/logger.js";
import env from "./env.js";

export default class MongoSingleton {
  static #instance;

  constructor() {
    this.#connectMongoDB();
  }

  static getInstance() {
    if (this.#instance) {
      appLogger.info("Ya se ha abierto una conexion a MongoDB.");
    } else {
      this.#instance = new MongoSingleton();
    }
    return this.#instance;
  }

  #connectMongoDB = async () => {
    try {
      await connect(env.mongoUrl);
      appLogger.info("Conectado con exito a MongoDB usando Moongose");
    } catch (error) {
      appLogger.error("No se pudo conectar a la BD usando Moongose: " + error);
      process.exit();
    }
  };
}
