import Router from "express";
import { createProduct, deleteProduct, getProduct, listProducts, updateProduct } from "./products.controller.js";

import middlewares from "../../middlewares/index.js";
import multer from "multer";

const productRouter = Router();

const upload = multer({ dest: "uploads/" });

// Rutas públicas
productRouter.get("/", listProducts);

productRouter.get("/:pid", getProduct);

// Rutas protegidas - requieren autenticación y autorización

productRouter.post("/",
  //  middlewares.auth,
  //  middlewares.product,
  upload.fields([
    {
      name: "thumbnails",
      maxCount: 5,
    },
  ]),
  createProduct
);

productRouter.put("/:pid", updateProduct);

productRouter.delete("/:pid", middlewares.auth, deleteProduct);

export default productRouter;
