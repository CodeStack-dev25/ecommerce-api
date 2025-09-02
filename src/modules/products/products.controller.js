import ProductService from "./products.service.js";
import { appLogger } from "../../utils/logger.js";
import cloudinary from "../../config/cloudinary.js";

// Listar todos los productos

export const listProducts = async (req, res) => {
  try {
    const products = await ProductService.listProducts();
    if (!products || products.length === 0) {
      appLogger.error("No se encontraron productos");
      return res.status(404).json({ error: "No se encontraron productos" });
    }
    appLogger.info("Productos obtenidos correctamente");
    return res.status(200).json(products);
  } catch (err) {
    appLogger.error("Error al obtener los productos", err);
    return res.status(500).json({ error: "Error al obtener los productos" });
  }
};

// Obtener producto por ID

export const getProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await ProductService.getProduct(pid);
    if (!product) {
      appLogger.error("Producto no encontrado");
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    appLogger.info("Producto obtenido correctamente");
    return res.status(200).json(product);
  } catch (err) {
    appLogger.error("Error al obtener el producto", err);
    return res.status(500).json({ error: "Error al obtener el producto" });
  }
};

// Crear un nuevo producto

export const createProduct = async (req, res) => {
  try {
    const { brand, title, description, basePrice, category, subCategory, variants } = req.body;

    // Reorganizamos variants en el formato de stock
    const stock = variants.reduce((acc, { color, size, quantity }) => {
      let existingColor = acc.find((item) => item.color === color);

      if (existingColor) {
        existingColor.sizes.push({ size, quantity });
      } else {
        acc.push({
          color,
          sizes: [{ size, quantity }],
        });
      }

      return acc;
    }, []);

    let thumbnails = [];
    const thumbnailFiles = req.files?.thumbnails || [];

    if (thumbnailFiles.length > 0) {
      const results = await Promise.all(
        thumbnailFiles.map((file) => cloudinary.uploader.upload(file.path, { folder: "products" })),
      );
      thumbnails = results.map((r) => ({ url: r.secure_url, public_id: r.public_id }));
      await ProductService.deleteLocalFiles(thumbnailFiles.map((f) => f.path));
    }

    const productData = {
      brand,
      title,
      description,
      basePrice,
      category,
      subCategory,
      stock,
      thumbnails,
    };

    const product = await ProductService.createProduct(productData);

    appLogger.info("Producto creado correctamente");
    return res.status(201).json(product);
  } catch (err) {
    appLogger.error("Error al crear el producto", err);
    return res.status(500).json({ error: "Error al crear el producto" });
  }
};

// Actualizar un producto por ID

export const updateProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    let { variants, ...updateData } = req.body;

    if (variants && Array.isArray(variants)) {
      updateData.stock = variants.reduce((acc, { color, size, quantity }) => {
        let existingColor = acc.find((item) => item.color === color);

        if (existingColor) {
          existingColor.sizes.push({ size, quantity });
        } else {
          acc.push({
            color,
            sizes: [{ size, quantity }],
          });
        }

        return acc;
      }, []);
    }

    if (req.files?.thumbnails?.length) {
      const results = await Promise.all(
        req.files.thumbnails.map((file) =>
          cloudinary.uploader.upload(file.path, { folder: "products" }),
        ),
      );

      updateData.thumbnails = results.map((r) => ({
        url: r.secure_url,
        public_id: r.public_id,
      }));

      await ProductService.deleteLocalFiles(req.files.thumbnails.map((f) => f.path));
    }

    const updatedProduct = await ProductService.updateProduct(pid, updateData);

    if (!updatedProduct) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    return res.status(200).json(updatedProduct);
  } catch (err) {
    appLogger.error("Error al actualizar el producto", err);
    return res.status(500).json({ error: "Error al actualizar el producto" });
  }
};

// Eliminar un producto por ID

export const deleteProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const deletedProduct = await ProductService.deleteProduct(pid);
    if (!deletedProduct) {
      appLogger.error("Producto no encontrado");
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    appLogger.info("Producto eliminado correctamente");
    return res.status(200).json({ message: "Producto eliminado correctamente" });
  } catch (err) {
    appLogger.error("Error al eliminar el producto", err);
    return res.status(500).json({ error: "Error al eliminar el producto" });
  }
};
