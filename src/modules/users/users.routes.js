import Router from "express";
import AdminController from "./users.controller.js";

const adminRouter = Router();

adminRouter.post("/login", AdminController.login);
adminRouter.post("/logout", AdminController.logout);

export default adminRouter;
