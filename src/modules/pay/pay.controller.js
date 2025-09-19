import { MercadoPagoConfig, Preference, Payment } from "mercadopago";
import SalesService from "./pay.service.js";
import { appLogger } from "../../utils/logger.js";
import env from "../../config/env.js";
import ProductService from "../products/products.service.js";
import cloudinary from "../../config/cloudinary.js";
import { sendTicket } from "../../utils/mails.js";

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

  // PayController.ts
  async payWithTransfer(req, res) {
    try {
      const { user, items } = req.body;

      // Si el body viene como FormData, algunos campos vienen como string, parsearlos
      const parsedItems = typeof items === "string" ? JSON.parse(items) : items;
      const parsedUser = typeof user === "string" ? JSON.parse(user) : user;

      // Subida a Cloudinary
      let comprobanteUrl;
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, { folder: "tickets" });
        comprobanteUrl = result.secure_url;
        await ProductService.deleteLocalFiles([req.file.path]);
      }

      console.log(comprobanteUrl);

      const sale = {
        user: {
          name: parsedUser.name,
          email: parsedUser.email,
          phone: parsedUser.phone || "",
          address: parsedUser.address || "",
          city: parsedUser.city || "",
          postalCode: parsedUser.postalCode || "",
        },
        items: parsedItems.map((i) => ({
          productId: i.productId,
          title: i.title,
          quantity: i.quantity,
          price: i.price,
          color: i.color || "",
          size: i.size || "",
        })),
        total: parsedItems.reduce((acc, i) => acc + Number(i.price) * Number(i.quantity), 0),
        status: "pending",
        comprobanteUrl,
      };

      const newTicket = await SalesService.createSale(sale);
      appLogger.info("Ticket creado correctamente");
      return res.status(201).json(newTicket);
    } catch (error) {
      appLogger.error("Error procesando el comprobante", error);
      return res.status(500).json(error);
    }
  }

  async gellAllSales(req, res) {
    try {
      const tickets = await SalesService.getTickets();
      appLogger.info("Comprobantes obtenidos correctamente");
      return res.status(201).json(tickets);
    } catch (error) {
      appLogger.error("Error al obtener comprobantes", error);
      return res.status(500).json(error);
    }
  }

  async updateStatus(req, res) {
    try {
      const { tid } = req.params;
      const ticket = await SalesService.getTicketById(tid);
      if (!ticket) {
        appLogger.error("Comprobante no encontrado");
        return res.status(400).json("Comprobante no encontrado");
      }else{
        ticket.status = "approved"
      }

      
      await SalesService.updateSaleStatus(ticket._id, ticket);

      await sendTicket(ticket, "Transferencia")

      appLogger.info("Comprobante actualizado");
      return res.status(201).json(ticket);
    } catch (error) {
      appLogger.error("Error al actualizar comprobantes", error);
      return res.status(500).json(error);
    }
  }
}

export default new PayController();
