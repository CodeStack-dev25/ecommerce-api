import { transporter } from "../config/nodemailer.js";
import { appLogger } from "./logger.js";
import { mailDetailShopping } from "./mailDetailShopping.js";
import { mailDetailShoppingAdmin } from "./mailDetailShoppingAdmin.js";
import { mailPayStatus } from "./mailPayStatus.js";

export const sendTicket = async (ticket, mode) => {
    try {
        const email = await transporter.sendMail({
            from: '<cristian.eam85@gmail.com>',
            to: ticket.user.email,
            subject: 'Gracias por su compra!',
            html: mailPayStatus(ticket, mode),
        });
        appLogger.info('Correo enviado:', email.response);
    } catch (error) {
        appLogger.error('Error al enviar el correo:', error);
    }
};

export const detailTicket = async (ticket, mode) => {
    try {
        const email = await transporter.sendMail({
            from: '<cristian.eam85@gmail.com>',
            to: ticket.user.email,
            subject: 'Detalle de su compra!',
            html: mailDetailShopping(ticket, mode),
        });
        appLogger.info('Correo enviado:', email.response);
    } catch (error) {
        appLogger.error('Error al enviar el correo:', error);
    }
};

export const adminTicket = async (ticket, mode) => {
    try {
        const email = await transporter.sendMail({
            from: '<cristian.eam85@gmail.com>',
            to: ticket.user.email,
            subject: 'Nueva compra recibida',
            html: mailDetailShoppingAdmin(ticket, mode),
        });
        appLogger.info('Correo enviado:', email.response);
    } catch (error) {
        appLogger.error('Error al enviar el correo:', error);
    }
};