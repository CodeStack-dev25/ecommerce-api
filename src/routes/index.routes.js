import { Router } from "express";
import productRouter from "../modules/products/products.routes.js";
import cartRouter from "../modules/cars/carts.routes.js";
import adminRouter from "../modules/users/users.routes.js";

const indexRoutes = Router();

indexRoutes.use("/api/products", productRouter);
indexRoutes.use("/api/carts", cartRouter);
indexRoutes.use("/api/users", adminRouter);

export default indexRoutes;
