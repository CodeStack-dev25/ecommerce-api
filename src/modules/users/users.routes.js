import Router from "express";
import env from "../../config/env.js";
import jwt from "jsonwebtoken";
import { appLogger } from "../../utils/logger.js";

const adminRouter = Router();

adminRouter.get("/check-auth", (req, res) => {
  const token = req.cookies?.adminToken;

  if (!token) {
    return res.status(401).json({ authenticated: false, message: "No hay token" });
  }

  try {
    const decoded = jwt.verify(token, env.jwtSecret);

    appLogger.info("Token verificado correctamente");
    return res.json({ authenticated: true, role: decoded.role });
  } catch (err) {
    appLogger.error("Error al verificar token", err);
    return res.status(401).json({ authenticated: false, message: "Token inválido o expirado" });
  }
});

adminRouter.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === env.adminMail && password === env.adminToken) {
    // Generamos un token JWT
    const token = jwt.sign({ role: "admin" }, env.jwtSecret, { expiresIn: "2h" });

    // Guardamos el token en cookie
    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 2 * 60 * 60 * 1000,
    });

    appLogger.info("Login exitoso");
    return res.json({ message: "Login exitoso" });
  } else {
    appLogger.warn("Intento de login fallido");
    return res.status(401).json({ message: "Usuario o contraseña incorrectos" });
  }
});

adminRouter.post("/logout", (req, res) => {
  res.clearCookie("adminToken");
  appLogger.info("Logout exitoso");
  res.json({ message: "Logout exitoso" });
});

export default adminRouter;
