import { Router } from "express";
import SettingsController from "./setting.controller.js";

const settingRouter = Router();

settingRouter.get("/", SettingsController.getSettings);
settingRouter.post("/discount", SettingsController.updateDiscount);
settingRouter.post("/increase-prices", SettingsController.increaseProductPrices);

export default settingRouter;
