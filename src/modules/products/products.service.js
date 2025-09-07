import ProductRepository from "./repositories/products.repository.js";
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
}

export default new ProductService();
