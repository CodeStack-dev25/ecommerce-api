import Router from "express";
import multer from "multer";
import ProductsController from "./products.controller.js";

const productRouter = Router();

// Configuración de almacenamiento y límites
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB por archivo
  },
});

productRouter.get("/", ProductsController.listProducts);
productRouter.get("/:pid", ProductsController.getProduct);

// Carga de múltiples imágenes (máximo 10 archivos, por ejemplo)
productRouter.post("/", upload.array("thumbnails", 10), ProductsController.createProduct);
productRouter.put("/:pid", upload.array("thumbnails", 10), ProductsController.updateProduct);
productRouter.delete("/:pid", ProductsController.deleteProduct);

export default productRouter;
