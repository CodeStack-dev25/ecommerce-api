import ProductService from "./products.service.js";
import { appLogger } from "../../utils/logger.js";
import { errorResponse, successResponse } from "../../utils/helpers.js";

// Listar todos los productos con opción de paginación
export const listProducts = async (req, res) => {
  try {
    const products = await ProductService.listProducts();
    if (!products || products.length === 0) {
      appLogger.error("No se encontraron productos");
      return errorResponse(res, "No se encontraron productos", [], 404);
    }
    appLogger.info("Productos obtenidos correctamente");
    return successResponse(res, products, "Productos obtenidos correctamente", 200);
  } catch (err) {
    appLogger.error("Error al obtener los productos", err);
    return errorResponse(res, "Error al obtener los productos", err, 500);
  }
};

// Obtener producto por ID
export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductService.getProduct(id);
    if (!product) {
      appLogger.error("Producto no encontrado");
      return errorResponse(res, "Producto no encontrado", [], 404);
    }
    appLogger.info("Producto obtenido correctamente");
    return successResponse(res, product, "Producto obtenido correctamente", 200);
  } catch (err) {
    appLogger.error("Error al obtener el producto", err);
    return errorResponse(res, "Error al obtener el producto", err, 500);
  }
};

// Crear un nuevo producto
export const createProduct = async (req, res) => {
  try {
    const { brand, title, description, basePrice, stock, category, subCategory, variants } = req.body;

    let thumbnails = [];
    const thumbnailFiles = req.files?.thumbnails || [];

    if (thumbnailFiles.length > 0) {
      const uploadPromises = thumbnailFiles.map(file =>
        cloudinary.uploader.upload(file.path, { folder: "products" })
      );
      const results = await Promise.all(uploadPromises);
      thumbnails = results.map(r => ({ url: r.secure_url, public_id: r.public_id }));

      await ProductService.deleteLocalFiles(thumbnailFiles.map(f => f.path));
    }

    let parsedVariants = [];
    const variantFiles = req.files?.variantFiles || [];

    if (variants) {
      const variantsArray = JSON.parse(variants);

      for (let i = 0; i < variantsArray.length; i++) {
        const variant = variantsArray[i];
        let variantImages = [];

        // Asociar archivos de la variante por índice
        if (variantFiles[i] && variantFiles[i].length > 0) {
          const uploadPromises = variantFiles[i].map(file =>
            cloudinary.uploader.upload(file.path, { folder: "products/variants" })
          );
          const results = await Promise.all(uploadPromises);
          variantImages = results.map(r => ({ url: r.secure_url, public_id: r.public_id }));

          await ProductService.deleteLocalFiles(variantFiles[i].map(f => f.path));
        }

        parsedVariants.push({
          color: variant.color,
          size: variant.size,
          price: variant.price || basePrice,
          stock: variant.stock || stock,
          images: variantImages,
        });
      }
    }

    const productData = {
      brand,
      title,
      description,
      basePrice,
      stock,
      category,
      subCategory,
      thumbnails,
      variants: parsedVariants,
    };

    const product = await ProductService.create(productData);
    appLogger.info("Producto creado correctamente");
    return successResponse(res, product, "Producto creado correctamente", 201);

  } catch (err) {
    appLogger.error("Error al crear el producto", err);
    return errorResponse(res, "Error al crear el producto", err, 500);
  }
};


// Actualizar un producto por ID
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedProduct = await ProductService.updateProduct(id, updateData);
    if (!updatedProduct) {
      appLogger.error("Producto no encontrado");
      return errorResponse(res, "Producto no encontrado", [], 404);
    }
    appLogger.info("Producto actualizado correctamente");
    return successResponse(res, updatedProduct, "Producto actualizado correctamente", 200);
  } catch (err) {
    appLogger.error("Error al actualizar el producto", err);
    return errorResponse(res, "Error al actualizar el producto", err, 500);
  }
};

// Eliminar un producto por ID
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await ProductService.deleteProduct(id);
    if (!deletedProduct) {
      appLogger.error("Producto no encontrado");
      return errorResponse(res, "Producto no encontrado", [], 404);
    }
    appLogger.info("Producto eliminado correctamente");
    return successResponse(res, deletedProduct, "Producto eliminado correctamente", 200);
  } catch (err) {
    appLogger.error("Error al eliminar el producto", err);
    return errorResponse(res, "Error al eliminar el producto", err, 500);
  }
};
