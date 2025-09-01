import Router from "express";
import {createProduct, deleteProduct, getProduct, listProducts, updateProduct} from "./products.controller.js"

import middlewares from "../../middlewares/index.js";
import multer from "multer";

const productRouter = Router();

const upload = multer({ dest: "uploads/" });

// Rutas públicas
productRouter.get("/", listProducts);
productRouter.get("/:id", getProduct);

// Rutas protegidas (solo admin, por ejemplo)
productRouter.post(
  "/",
  middlewares.auth,
  middlewares.product,
  upload.fields([
    {
      name: "thumbnails",
      maxCount: 5,
    },
    {
      name: "variantFiles",
      maxCount: 10,
    },
  ]),
  createProduct
);

productRouter.put("/:id", middlewares.auth, middlewares.product, updateProduct);
productRouter.delete("/:id", middlewares.auth, deleteProduct);

export default productRouter;
