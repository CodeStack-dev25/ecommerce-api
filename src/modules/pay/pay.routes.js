import { Routes } from "express";
import { createSale, paymentWebhook } from "./sales.controller.js";

const payRoutes = Routes();

payRoutes.post("/", createSale);
payRoutes.post("/webhook", paymentWebhook);

export default payRoutes;