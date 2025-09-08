import { MercadoPagoConfig, Preference, Payment } from "mercadopago";
import SalesService from "./pay.service.js";
import { appLogger } from "../../utils/logger.js";
import env from "../../config/env.js";

// Configuración del cliente
const mpClient = new MercadoPagoConfig({ accessToken: env.mpToken });

class PayController {
  // Crear una nueva orden + preferencia
  async createSale(req, res) {
    try {
      const { user, items, total } = req.body;

      if (!user || !items || items.length === 0) {
        return res.status(400).json({ error: "Datos de la orden incompletos" });
      }

      // Creamos preferencia
      const preference = new Preference(mpClient);
      const mpResponse = await preference.create({
        body: {
          items: items.map((i) => ({
            title: i.title,
            unit_price: Number(i.price),
            quantity: i.quantity,
          })),
          payer: {
            name: user.name,
            email: user.email,
            phone: { number: user.phone },
          },
          back_urls: {
            success: "http://localhost:3000/success",
            failure: "http://localhost:3000/failure",
          },
          auto_return: "approved",
          external_reference: "sale-" + Date.now(), // ID único de orden
        },
      });

      // Guardamos la venta en DB
      const sale = await SalesService.createSale({
        user,
        items,
        total,
        preferenceId: mpResponse.id,
        status: "pending",
      });

      return res.status(201).json({
        message: "Orden creada correctamente",
        sale,
        init_point: mpResponse.init_point,
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

        const payment = new Payment(mpClient);
        const paymentInfo = await payment.get({ id: paymentId });

        const status = paymentInfo.status;
        const reference = paymentInfo.external_reference;

        await SalesService.updateSaleStatus(reference, status, paymentId);
      }

      return res.sendStatus(200);
    } catch (err) {
      appLogger.error("Error en webhook de pago", err);
      return res.sendStatus(200); // siempre devolver 200 a MP
    }
  }
}

export default new PayController();
