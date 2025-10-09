import  AdminService  from "./users.service.js";
import { appLogger } from "../../utils/logger.js";

class AdminController {
  // Login Admin
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const token = await AdminService.login(username, password);

      if (!token) {
        appLogger.warn("Intento de login fallido");
        return res.status(401).json({ message: "Usuario o contraseña incorrectos" });
      }

      res.cookie("adminToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });

      appLogger.info("Login exitoso");
      return res.status(200).json({ message: "Login exitoso" });
    } catch (err) {
      appLogger.error("Error en login", err);
      return res.status(500).json({ error: "Error en login" });
    }
  }

  // Logout Admin
  async logout(req, res) {
    try {
      res.clearCookie("adminToken");
      appLogger.info("Logout exitoso");
      return res.status(200).json({ message: "Logout exitoso" });
    } catch (err) {
      appLogger.error("Error en logout", err);
      return res.status(500).json({ error: "Error en logout" });
    }
  }
}

export default new AdminController();
