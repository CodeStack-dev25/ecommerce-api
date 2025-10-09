import SettingsService from "./setting.services.js";
import { appLogger } from "../../utils/logger.js";

class SettingsController {
  // Obtener configuración global
  async getSettings(req, res) {
    try {
      const settings = await SettingsService.getAllSettings();
      appLogger.info("Configuración obtenida correctamente");
      res.status(200).json(settings);
    } catch (err) {
      appLogger.error("Error al obtener configuración", err);
      res.status(500).json({ error: "Error al obtener configuración" });
    }
  }

  // Actualizar porcentaje de descuento
  async updateDiscount(req, res) {
    try {
      const { discount } = req.body;
      const settings = await SettingsService.updDiscount(discount);
      appLogger.info("Descuento actualizado correctamente");
      res.status(200).json({ message: "Descuento actualizado", discount: settings.discount });
    } catch (err) {
      appLogger.error("Error al actualizar descuento", err);
      res.status(400).json({ error: err.message });
    }
  }

  // Aumentar precios de productos
  async increaseProductPrices(req, res) {
    try {
      const { percentage } = req.body;
      await SettingsService.increasePrices(percentage);
      appLogger.info(`Precios aumentados un ${percentage}% correctamente`);
      res.status(200).json({ message: `Precios aumentados un ${percentage}%` });
    } catch (err) {
      appLogger.error("Error al aumentar precios", err);
      res.status(400).json({ error: err.message });
    }
  }
}

export default new SettingsController();
