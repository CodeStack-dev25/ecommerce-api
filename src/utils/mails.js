import { transporter } from "../config/nodemailer.js";
import { appLogger } from "./logger.js";
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