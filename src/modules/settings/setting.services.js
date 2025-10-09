import  SettingsRepository  from "./repository/setting.repository.js";

class SettingsService {
  // Obtener configuración global
  async getAllSettings() {
    return await SettingsRepository.getSettings();
  }

  // Actualizar porcentaje de descuento
  async updDiscount(discount) {
    if (discount < 0 || discount > 100) {
      throw new Error("El descuento debe estar entre 0 y 100");
    }
    return await SettingsRepository.updateDiscount(discount);
  }

  // Aumentar precios de productos
  async increasePrices(percentage) {
    if (!percentage || isNaN(percentage)) {
      throw new Error("Porcentaje inválido");
    }
    await SettingsRepository.increaseProductPrices(percentage);
  }
}

export default new SettingsService();
