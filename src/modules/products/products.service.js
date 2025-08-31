import ProductRepository from "./repositories/product.repository.js";
import fs from "fs";

class ProductService {
  async listProducts() {
    return ProductRepository.getAll();
  }

  async getProduct(id) {
    return ProductRepository.getById(id);
  }

  async createProduct(data) {
    return ProductRepository.create(data);
  }

  async updateProduct(id, data) {
    return ProductRepository.update(id, data);
  }

  async deleteProduct(id) {
    return ProductRepository.delete(id);
  }

  async deleteLocalFiles(files) {
    return files.forEach((file) => {
      fs.unlinkSync(file);
    });
  }
}

export default new ProductService();
