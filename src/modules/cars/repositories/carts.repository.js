import CartModel from "../models/carts.model";

class CartRepository {
  // Listar todos los carritos
  async getAll() {
    return CartModel.find();
  }
  // Obtener carrito por ID
  async getById(id) {
    return CartModel.findById(id);
  }
  // Crear un nuevo carrito
  async create(cartData) {
    const cart = new CartModel(cartData);
    return cart.save();
  }
  // Actualizar carrito por ID
  async update(id, updateData) {
    return CartModel.findByIdAndUpdate(id, updateData, { new: true });
  }
  // Eliminar carrito por ID
  async delete(id) {
    return CartModel.findByIdAndDelete(id);
  }
}

export default new CartRepository();
