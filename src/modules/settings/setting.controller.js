import { Router } from "express";
import Settings from "../settings/model.js"; 
import Product from "../products/models/products.model.js";

const settingRouter = Router();

//Obtener configuración global (descuento, etc.)

settingRouter.get("/", async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings({ discount: 0 });
      await settings.save();
    }
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener configuración" });
  }
});

//Actualizar porcentaje de descuento global
settingRouter.post("/discount", async (req, res) => {
  try {
    const { discount } = req.body;
    if (discount < 0 || discount > 100) {
      return res.status(400).json({ error: "El descuento debe estar entre 0 y 100" });
    }

    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings({ discount });
    } else {
      settings.discount = discount;
    }
    await settings.save();

    res.json({ message: "Descuento actualizado", discount: settings.discount });
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar descuento" });
  }
});

// Aumentar precios de todos los productos por porcentaje

settingRouter.post("/increase-prices", async (req, res) => {
  try {
    const { percentage } = req.body;
    if (!percentage || isNaN(percentage)) {
      return res.status(400).json({ error: "Porcentaje inválido" });
    }

    const multiplier = 1 + percentage / 100;

    await Product.updateMany({}, [{ $set: { price: { $round: [{ $multiply: ["$price", multiplier] }, 2] } } }]);

    res.json({ message: `Precios aumentados un ${percentage}%` });
  } catch (err) {
    res.status(500).json({ error: "Error al aumentar precios" });
  }
});

export default settingRouter;
