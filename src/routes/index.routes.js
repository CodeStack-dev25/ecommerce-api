import { Router } from "express";
import productRouter from "../modules/products/products.routes.js";
import adminRouter from "../modules/users/users.routes.js";
import payRoutes from "../modules/pay/pay.routes.js";
import settingRouter from "../modules/settings/setting.controller.js";

const indexRoutes = Router();

indexRoutes.use("/api/products", productRouter);
indexRoutes.use("/api/admin", adminRouter);
indexRoutes.use("/api/pay", payRoutes);
indexRoutes.use("/api/setting", settingRouter)

export default indexRoutes;
