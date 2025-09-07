import { Routes } from "express";
import PayController from "./pay.controller";

const payRoutes = Routes();

payRoutes.post("/", PayController.createSale);
payRoutes.post("/webhook", PayController.paymentWebhook);

export default payRoutes;