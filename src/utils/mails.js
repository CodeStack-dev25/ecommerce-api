import { transporter } from "../config/nodemailer.js";
import { appLogger } from "./logger.js";
import { mailDetailShopping } from "./mailDetailShopping.js";
import { mailDetailShoppingAdmin } from "./mailDetailShoppingAdmin.js";
import env from "../config/env.js";
import { mailPayStatus } from "./mailPayStatus.js";

export const sendTicket = async (ticket, mode, discount) => {
  try {
    const email = await transporter.sendMail({
      from: "<aerotacticotandil@gmail.com>",
      to: ticket.user.email,
      subject: "Gracias por su compra!",
      html: mailPayStatus(ticket, mode, discount),
    });
    appLogger.info("Correo enviado:", email.response);
  } catch (error) {
    appLogger.error("Error al enviar el correo:", error);
  }
};

export const detailTicket = async (ticket, mode, discout) => {
  try {
    const email = await transporter.sendMail({
      from: "<aerotacticotandil@gmail.com>",
      to: ticket.user.email,
      subject: "Detalle de su compra!",
      html: mailDetailShopping(ticket, mode, discout),
    });
    appLogger.info("Correo enviado:", email.response);
  } catch (error) {
    appLogger.error("Error al enviar el correo:", error);
  }
};

export const adminTicket = async (ticket, mode, discout) => {
  try {
    const email = await transporter.sendMail({
      from: "<aerotacticotandil@gmail.com>",
      to: env.adminMail,
      subject: "Nueva compra recibida",
      html: mailDetailShoppingAdmin(ticket, mode, discout),
    });
    appLogger.info("Correo enviado:", email.response);
  } catch (error) {
    appLogger.error("Error al enviar el correo:", error);
  }
};
