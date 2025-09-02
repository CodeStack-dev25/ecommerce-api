import ProductModel from "../models/products.model.js";

class ProductRepository {
  
  // Listar todos los productos
  async getAll() {
    return ProductModel.find();
  }

  // Obtener producto por ID
  async getById(id) {
    return ProductModel.findById(id);
  }

  // Crear un nuevo producto
  async create(productData) {
    const product = new ProductModel(productData);
    return product.save();
  }

  // Actualizar producto por ID
  async update(id, updateData) {
    return ProductModel.findByIdAndUpdate(id, updateData, { new: true });
  }

  // Eliminar producto por ID
  async delete(id) {
    return ProductModel.findByIdAndDelete(id);
  }

  // Buscar por código único
  async getByCode(code) {
    return ProductModel.findOne({ code });
  }
}

export default new ProductRepository();
