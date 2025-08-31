import dotenv from 'dotenv';

dotenv.config()

export default {
    port: process.env.PORT,
    mongoUrl: process.env.DB_URL,
    secret: process.env.SECRET
}