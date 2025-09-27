import Router from "express";
import ProductsController from "./products.controller.js";
import multer from "multer";

const productRouter = Router();

const upload = multer({ dest: "uploads/" });

productRouter.get("/", ProductsController.listProducts);
productRouter.get("/:pid", ProductsController.getProduct);
productRouter.post("/", upload.array("thumbnails"), ProductsController.createProduct);
productRouter.put("/:pid", upload.array("thumbnails"), ProductsController.updateProduct);
productRouter.delete("/:pid", ProductsController.deleteProduct);

export default productRouter;
