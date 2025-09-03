import Router from "express";
import env from "../../config/env.js";
import { appLogger } from "../../utils/logger.js";

const adminRouter = Router()

adminRouter.post("/check", (req, res) => {
  const { token } = req.body;

  if (token === env.adminToken) {
    appLogger.info("Admin token validado correctamente");
    return res.json({ isAdmin: true });
  }
  appLogger.warn("Intento de acceso con admin token inválido");
  return res.json({ isAdmin: false });
});

export default adminRouter;