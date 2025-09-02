import { Router } from "express";
import productRouter from "../modules/products/products.routes.js";
import cartRouter from "../modules/cars/carts.routes.js";

const indexRoutes = Router();

indexRoutes.use("/api/products", productRouter);
indexRoutes.use("/api/carts", cartRouter);

export default indexRoutes;
