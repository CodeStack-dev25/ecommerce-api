import Router from "express";
import ProductsController from "./products.controller.js";
import multer from "multer";

const productRouter = Router();

const upload = multer({ dest: "uploads/" });

productRouter.get("/", ProductsController.listProducts);
productRouter.get("/:pid", ProductsController.getProduct);
productRouter.post("/", upload.fields([{ name: "thumbnails", maxCount: 5 }]), ProductsController.createProduct);
productRouter.put("/:pid", upload.fields([{ name: "thumbnails", maxCount: 5 }]), ProductsController.updateProduct);
productRouter.delete("/:pid", ProductsController.deleteProduct);

export default productRouter;
