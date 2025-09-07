import SalesService from "./pay.service.js";
import { appLogger } from "../../utils/logger.js";
import mercadopago from "mercadopago";
import env from "../../config/env.js";

mercadopago.configure({
  access_token: env.mpToken,
});

class PayController {
  // Configurar SDK

  // Crear una nueva orden + preferencia
  async createSale(req, res) {
    try {
      const { user, items, total } = req.body;

      if (!user || !items || items.length === 0) {
        return res.status(400).json({ error: "Datos de la orden incompletos" });
      }

      // Creamos preferencia en MercadoPago
      const preference = {
        items: items.map((i) => ({
          title: i.title,
          unit_price: i.price,
          quantity: i.quantity,
        })),
        payer: {
          name: user.name,
          email: user.email,
          phone: user.phone,
        },
        back_urls: {
          success: "http://localhost:3000/success",
          failure: "http://localhost:3000/failure",
        },
        auto_return: "approved",
      };

      const mpResponse = await mercadopago.preferences.create(preference);

      // Guardamos la venta en DB
      const sale = await SalesService.createSale({
        user,
        items,
        total,
        preferenceId: mpResponse.body.id,
        status: "pending",
      });

      return res.status(201).json({
        message: "Orden creada correctamente",
        sale,
        init_point: mpResponse.body.init_point,
      });
    } catch (err) {
      appLogger.error("Error al crear la venta", err);
      return res.status(500).json({ error: "Error al crear la venta" });
    }
  }

  // Webhook de MercadoPago
  async paymentWebhook(req, res) {
    try {
      const { type, data } = req.body;

      if (type === "payment") {
        const paymentId = data.id;

        // Buscar el pago en MP
        const payment = await mercadopago.payment.findById(paymentId);

        const preferenceId = payment.body.order.id;
        const status = payment.body.status;

        await SalesService.updateSaleStatus(preferenceId, status, paymentId);
      }

      return res.sendStatus(200);
    } catch (err) {
      appLogger.error("Error en webhook de pago", err);
      return res.sendStatus(500);
    }
  }
}

export default new PayController()