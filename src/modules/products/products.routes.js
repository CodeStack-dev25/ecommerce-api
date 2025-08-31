import express from "express";
import { listProducts, getProduct, createProduct, updateProduct, deleteProduct } from "./controllers/product.controller.js";

import { authMiddleware, validateProduct } from "../../middlewares/index.js";
import multer from "multer";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

// Rutas públicas
router.get("/", listProducts);
router.get("/:id", getProduct);

// Rutas protegidas (solo admin, por ejemplo)
router.post(
  "/",
  authMiddleware,
  validateProduct,
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

router.put("/:id", authMiddleware, validateProduct, updateProduct);
router.delete("/:id", authMiddleware, deleteProduct);

export default router;
