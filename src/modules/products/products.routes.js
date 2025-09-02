import Router from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  listProducts,
  updateProduct,
} from "./products.controller.js";

import middlewares from "../../middlewares/index.js";
import multer from "multer";

const productRouter = Router();

const upload = multer({ dest: "uploads/" });

productRouter.get("/", listProducts);
productRouter.get("/:pid", getProduct);
productRouter.post("/", upload.fields([{ name: "thumbnails", maxCount: 5 }]), createProduct);
productRouter.put("/:pid", updateProduct);
productRouter.delete("/:pid", middlewares.auth, deleteProduct);

export default productRouter;
