import { Router } from "express";
import PayController from "./pay.controller.js";
import multer from "multer";

const payRoutes = Router();

const upload = multer({ dest: "uploads/" });

payRoutes.post("/createSale", PayController.createSale);
payRoutes.post("/webhook", PayController.paymentWebhook);
payRoutes.post("/uploadReceipt", upload.single("receipt"), PayController.payWithTransfer);
payRoutes.get("/", PayController.gellAllSales);
payRoutes.put("/:tid", PayController.updateStatus);

export default payRoutes;
