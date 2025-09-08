import { Router } from "express";
import PayController from "./pay.controller.js";

const payRoutes = Router();

payRoutes.post("/", PayController.createSale);
payRoutes.post("/webhook", PayController.paymentWebhook);

export default payRoutes;