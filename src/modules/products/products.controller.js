import ProductService from "./products.service.js";
import { appLogger } from "../../utils/logger.js";
import cloudinary from "../../config/cloudinary.js";
import { controllerString, mapProduct } from "../../utils/helpers.js";

class ProductController {
  // Listar todos los productos
  async listProducts(req, res) {
    try {
      const { category, title } = req.query;
      let products = await ProductService.listProducts();

      if (!products || products.length === 0) {
        appLogger.error("No se encontraron productos");
        return res.status(404).json({ error: "No se encontraron productos" });
      }

      if (category) {
        products = products.filter((p) => p.category.toLowerCase() === category.toLowerCase());
      }

      if (title) {
        products = products.filter((p) => p.title.toLowerCase().includes(title.toLowerCase()));
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
      appLogger.info("Producto obtenido correctamente");
      return res.status(200).json(mappedProduct);
    } catch (err) {
      appLogger.error("Error al obtener el producto", err);
      return res.status(500).json({ error: "Error al obtener el producto" });
    }
  }

  // Crear un nuevo producto
  async createProduct(req, res) {
    try {
      const productData = req.body;
      if (!productData) return res.status(400).json({ error: "No se recibió el producto" });

      const { brand = "", title = "", description = "", category = "", subCategory = "", price, variants = [] } = productData;

      if (!title || !price || !category) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
      }

      let thumbnails = [];
      const thumbnailFiles = req.files || [];
      if (thumbnailFiles.length > 0) {
        const results = await Promise.all(thumbnailFiles.map((file) => cloudinary.uploader.upload(file.path, { folder: "products" })));
        thumbnails = results.map((r) => ({ url: r.secure_url, public_id: r.public_id }));
        await ProductService.deleteLocalFiles(thumbnailFiles.map((f) => f.path));
      }

      let parsedVariants = variants;

      if (parsedVariants && typeof parsedVariants === "string") {
        try {
          parsedVariants = JSON.parse(parsedVariants);
        } catch (err) {
          parsedVariants = [];
        }
      }

      const flatVariants = Array.isArray(parsedVariants)
        ? parsedVariants.flatMap(
            (v) =>
              v.sizes?.map((s) => ({
                color: v.name.toUpperCase(),
                size: s.name.toUpperCase(),
                stock: s.stock ?? 0,
              })) || [],
          )
        : [];

      const createdProduct = await ProductService.createProduct({
        brand: brand.toUpperCase(),
        title: title.toUpperCase(),
        description,
        price,
        category: controllerString(category),
        subCategory: controllerString(subCategory),
        thumbnails,
        variants: flatVariants,
      });

      appLogger.info("Producto creado correctamente");
      return res.status(201).json(createdProduct);
    } catch (err) {
      console.error(err);
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

      let { variants = [], ...rest } = req.body;

      if (variants && typeof variants === "string") {
        try {
          variants = JSON.parse(variants);
        } catch {
          variants = [];
        }
      }

      if (Array.isArray(variants)) {
        const mergedVariants = [];

        variants.forEach((variant) => {
          const { name, sizes } = variant;

          if (!sizes || !Array.isArray(sizes)) return;

          sizes.forEach((s) => {
            if (!s.name) return;

            const index = mergedVariants.findIndex((ex) => ex.color === name && ex.size === s.name);

            if (index >= 0) {
              mergedVariants[index].stock += s.stock;
            } else {
              mergedVariants.push({
                color: controllerString(name),
                size: controllerString(s.name),
                stock: s.stock ?? 0,
              });
            }
          });
        });

        existingProduct.variants = mergedVariants;
      }

      Object.keys(rest).forEach((key) => {
        if (rest[key] !== undefined) {
          existingProduct[key] = rest[key];
        }
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

  async deleteProduct(req, res) {
    try {
      const { pid } = req.params;

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
