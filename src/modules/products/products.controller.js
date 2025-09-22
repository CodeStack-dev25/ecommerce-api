import ProductService from "./products.service.js";
import { appLogger } from "../../utils/logger.js";
import cloudinary from "../../config/cloudinary.js";
import { mapProduct } from "../../utils/helpers.js";

class ProductController {
  // Listar todos los productos
  async listProducts(req, res) {
    try {
      const products = await ProductService.listProducts();
      if (!products || products.length === 0) {
        appLogger.error("No se encontraron Productos");
        return res.status(404).json({ error: "No se encontraron productos" });
      }

      const mappedProducts = products.map(mapProduct);
      appLogger.info("Productos obtenidos correctamente");
      return res.status(200).json(mappedProducts);
    } catch (err) {
      appLogger.error("Error al obtener los productos");
      return res.status(500).json({ error: "Error al obtener los productos" });
    }
  }

  // Obtener producto por ID
  async getProduct(req, res) {
    try {
      const { pid } = req.params;
      const product = await ProductService.getProduct(pid);
      if (!product) return res.status(404).json({ error: "Producto no encontrado" });

      const mappedProduct = mapProduct(product);
      return res.status(200).json(mappedProduct);
    } catch (err) {
      return res.status(500).json({ error: "Error al obtener el producto" });
    }
  }

  // Crear un nuevo producto
  async createProduct(req, res) {
    try {
      const { product } = req.body;
      if (!product) {
        return res.status(400).json({ error: "No se recibió el producto" });
      }

      const parsedProduct = JSON.parse(product);
      const { brand, title, description, category, subCategory, price, variants } = parsedProduct;

      if (!brand || !title || !price || !category) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
      }

      let thumbnails = [];
      const thumbnailFiles = req.files?.thumbnails || [];
      if (thumbnailFiles.length > 0) {
        const results = await Promise.all(thumbnailFiles.map((file) => cloudinary.uploader.upload(file.path, { folder: "products" })));
        thumbnails = results.map((r) => ({ url: r.secure_url, public_id: r.public_id }));
        await ProductService.deleteLocalFiles(thumbnailFiles.map((f) => f.path));
      }

      const productData = {
        brand,
        title,
        description,
        price: price,
        category,
        subCategory,
        thumbnails,
        variants: Array.isArray(variants)
          ? variants.map((v) => ({
              color: v.color,
              size: v.size,
              stock: v.stock ?? 0,
            }))
          : [],
      };

      const createdProduct = await ProductService.createProduct(productData);
      appLogger.info("Producto creado correctamente");
      return res.status(201).json(createdProduct);
    } catch (err) {
      appLogger.error("Error al crear el producto", err);
      return res.status(500).json({ error: "Error al crear el producto" });
    }
  }

  // Actualizar un producto por ID
  async updateProduct(req, res) {
    try {
      const { pid } = req.params;

      const existingProduct = await ProductService.getProduct(pid);
      if (!existingProduct) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }
      
      let { variants, ...rest } = req.body;

      if (variants && typeof variants === "string") {
        try {
          variants = JSON.parse(variants);
        } catch {
          variants = [];
        }
      }

      // Merge variantes
      if (Array.isArray(variants)) {
        const mergedVariants = [...(existingProduct.variants || [])];

        variants.forEach((v) => {
          const index = mergedVariants.findIndex((ex) => ex.color === v.color && ex.size === v.size);

          if (index >= 0) {
            // Actualizamos stock de la variante existente
            mergedVariants[index].stock += v.stock ?? mergedVariants[index].stock;
          } else {
            // Agregamos nueva variante
            mergedVariants.push({
              color: v.color,
              size: v.size,
              stock: v.stock ?? 0,
            });
          }
        });

        existingProduct.variants = mergedVariants;
      }

      // Actualizamos el resto de campos
      Object.keys(rest).forEach((key) => {
        existingProduct[key] = rest[key];
      });

      const updatedProduct = await existingProduct.save();
      appLogger.info("Producto actualizado correctamente");
      return res.status(200).json(updatedProduct);
    } catch (err) {
      console.error(err);
      appLogger.error("Error al actualizar producto", err);
      return res.status(500).json({ error: "Error al actualizar el producto" });
    }
  }

  // Eliminar un producto por ID
  async deleteProduct(req, res) {
    try {
      const { pid } = req.params;

      // Primero obtenemos el producto para tener sus thumbnails
      const product = await ProductService.getProduct(pid);
      if (!product) {
        appLogger.error("Producto no encontrado");
        return res.status(404).json({ error: "Producto no encontrado" });
      }

      if (product.thumbnails && product.thumbnails.length > 0) {
        const destroyPromises = product.thumbnails.map((thumb) => cloudinary.uploader.destroy(thumb.public_id));
        await Promise.all(destroyPromises);
        appLogger.info("Imágenes de Cloudinary eliminadas correctamente");
      }

      await ProductService.deleteProduct(pid);

      appLogger.info("Producto eliminado correctamente");
      return res.status(200).json({ message: "Producto eliminado correctamente" });
    } catch (err) {
      appLogger.error("Error al eliminar el producto", err);
      return res.status(500).json({ error: "Error al eliminar el producto" });
    }
  }
}

export default new ProductController();
