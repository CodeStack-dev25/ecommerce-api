import ProductRepository from "./repositories/products.repository.js";
import { appLogger } from "../../utils/logger.js";
import fs from "fs";

class ProductService {
  // Listar todos los productos
  async listProducts() {
    return ProductRepository.getAll();
  }

  // Obtener producto por ID
  async getProduct(id) {
    return ProductRepository.getById(id);
  }

  // Crear un nuevo producto
  async createProduct(data) {
    return ProductRepository.create(data);
  }

  // Actualizar producto por ID
  async updateProduct(id, data) {
    return ProductRepository.update(id, data);
  }

  // Eliminar producto por ID
  async deleteProduct(id) {
    return ProductRepository.delete(id);
  }

  //Elminar archivos locales
  async deleteLocalFiles(files) {
    for (const file of files) {
      fs.unlinkSync(file);
    }
  }

  //Actualizar Stock
  async updateStock(order) {
    try {
      if (!order.items || !Array.isArray(order.items)) {
        appLogger.error("El pedido no contiene items válidos");
      }

      for (const item of order.items) {
        const prod = await this.getProduct(item.productId);

        if (!prod) {
          appLogger.error(`Producto ${item.productId} no encontrado`);
        }

        const variant = prod.variants.find((v) => v.color === item.color && v.size === item.size);

        if (!variant) {
          appLogger.error(`Variante no encontrada en producto ${prod.title} (${item.color} - ${item.size})`);
        }

        if (variant.stock < item.quantity) {
          appLogger.error(`Stock insuficiente para ${prod.title} (${item.color} - ${item.size})`);
        }

        variant.stock -= item.quantity;

        await prod.save();
      }
      appLogger.info("Stock actualizado correctamente");
      return { success: true };
    } catch (err) {
      appLogger.error("Error en updateStock:", err.message);
      throw err;
    }
  }
}

export default new ProductService();
