import { Router } from "express"
import productRouter from "../modules/products/products.routes.js"

const indexRoutes = Router()

indexRoutes.use('/api/products', productRouter)

export default indexRoutes