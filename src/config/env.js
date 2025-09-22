import dotenv from 'dotenv';

dotenv.config()

export default {
    port: process.env.PORT,
    mongoUrl: process.env.DB_URL,
    secret: process.env.SECRET,
    cloudName: process.env.CLOUD_NAME,
    cloudApiKey: process.env.CLOUD_API_KEY,
    cloudApiSecret: process.env.CLOUD_API_SECRET,
    jwtSecret: process.env.JWT_SECRET,
    adminToken: process.env.ADMIN_TOKEN,
    mpToken: process.env.MP_ACCESS_TOKEN,
    adminMail: process.env.ADMIN_MAIL,
    adminPass: process.env.ADMIN_PASS,
    frontURL: process.env.URL_FRONT,
    backURL: process.env.URL_BACK
}