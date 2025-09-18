import nodemailer from 'nodemailer'
import env from './env'

export const transporter = nodemailer.createTransport({
    host: "gmail",
    port: 587,
    secure: false,
    auth:{
        user: env.adminMail,
        pass: env.adminPass
    }
})