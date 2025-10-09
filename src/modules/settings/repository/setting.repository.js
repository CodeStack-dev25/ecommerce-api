import Settings from "../models/setting.model.js"
import Product from "../../products/models/products.model.js"

class SettingsRepository {
  // Obtener configuración global
  async getSettings() {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings({ discount: 0 });
      await settings.save();
    }
    return settings;
  }

  // Actualizar descuento
  async updateDiscount(discount) {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings({ discount });
    } else {
      settings.discount = discount;
    }
    await settings.save();
    return settings;
  }

  // Aumentar precios de productos
  async increaseProductPrices(percentage) {
    const multiplier = 1 + percentage / 100;
    await Product.updateMany(
      {},
      [{ $set: { price: { $round: [{ $multiply: ["$price", multiplier] }, 2] } } }]
    );
  }
}

export default new SettingsRepository();
