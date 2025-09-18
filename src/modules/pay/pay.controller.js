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
      const { user, items } = req.body;

      if (!user || !items || !items.length) {
        return res.status(400).json({ error: "Datos incompletos" });
      }

      // Validamos que cada item tenga productId, title, price y quantity
      for (const i of items) {
        if (!i.productId || !i.title || !i.price || !i.quantity) {
          return res.status(400).json({ error: "Items incompletos" });
        }
      }

      // Calculamos total
      const total = items.reduce((acc, item) => acc + Number(item.price) * Number(item.quantity), 0);

      // Creamos preferencia Mercado Pago
      const preference = new Preference(mpClient);
      const mpResponse = await preference.create({
        body: {
          items: items.map((i) => ({
            title: i.title,
            unit_price: Number(i.price),
            quantity: Number(i.quantity),
          })),
          payer: {
            name: user.name,
            email: user.email,
            phone: { number: user.phone },
          },
          back_urls: {
            success: `${env.frontURL}/success`,
            failure: `${env.frontURL}/failure`,
          },
          auto_return: "approved",
          external_reference: "sale-" + Date.now(),
        },
      });

      // Guardamos venta en DB respetando el schema
      const sale = await SalesService.createSale({
        user: {
          name: user.name,
          email: user.email,
          phone: user.phone || "",
          address: user.address || "",
        },
        items: items.map((i) => ({
          productId: i.productId,
          title: i.title,
          quantity: i.quantity,
          price: i.price,
          color: i.color || "",
          size: i.size || "",
        })),
        total,
        preferenceId: mpResponse.id,
        status: "pending",
      });

      return res.status(201).json({
        message: "Orden creada correctamente",
        sale,
        init_point: mpResponse.init_point, // link de pago Mercado Pago
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
      return res.sendStatus(200);
    }
  }
}

export default new PayController();
