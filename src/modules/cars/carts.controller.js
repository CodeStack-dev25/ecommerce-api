import ProductsService from "../products/products.service.js";
import { appLogger } from "../../utils/logger.js";

export const recibirJson = async (req, res) => {
  try {
    const cart = req.body;

    if (!cart.cart || cart.cart.length === 0) {
      appLogger.error("El carrito está vacío o no se envió correctamente");
      return res.status(400).json({ error: "No se enviaron productos en el carrito" });
    }

    const products = await ProductsService.listProducts();
    if (!products || products.length === 0) {
      appLogger.error("No se encontraron productos en la base de datos");
      return res.status(404).json({ error: "No se encontraron productos" });
    }

    const resultados = [];

    for (let i = 0; i < cart.cart.length; i++) {
      const item = cart.cart[i];

      const prod = products.find((p) => p._id.toString() === item._id);

      if (prod) {
        if (prod.stock < item.quantity) {
          appLogger.error(`Stock insuficiente para ${prod.title}`);
          resultados.push({
            id: item._id,
            producto: prod.title,
            estado: "error",
            mensaje: "Stock insuficiente",
          });
          continue;
        }

        const updateProd = { stock: prod.stock - item.quantity };
        await ProductsService.updateProduct(prod._id, updateProd);

        appLogger.info(`Stock de ${prod.title} actualizado correctamente`);
        resultados.push({
          id: item._id,
          producto: prod.title,
          cantidad: item.quantity,
          estado: "ok",
        });
      } else {
        appLogger.error(`Producto con ID ${item._id} no encontrado`);
        resultados.push({
          id: item._id,
          estado: "error",
          mensaje: "Producto no encontrado",
        });
      }
    }

    return res.status(200).json({
      message: "Procesamiento finalizado",
      resultados,
    });
  } catch (error) {
    appLogger.error("Error al actualizar productos", error);
    return res.status(500).json({ error: "Error al actualizar productos" });
  }
};

// Listar todos los carritos
// export const listCart = async (req, res) => {
//   try {
//     const carts = await CartService.listCarts();
//     if (!carts || carts.length === 0) {
//       appLogger.error("No se encontraron carritos");
//       return res.status(404).json({ error: "No se encontraron carritos" });
//     }
//     appLogger.info("Carritos obtenidos correctamente");
//     return res.status(200).json(carts);
//   } catch (err) {
//     appLogger.error("Error al obtener los carritos", err);
//     return res.status(500).json({ error: "Error al obtener los carritos" });
//   }
// };

// Obtener carrito por ID
// export const getCart = async (req, res) => {
//   try {
//     const { cid } = req.params;
//     const cart = await CartService.getCart(cid);
//     console.log(cart);

//     if (!cart) {
//       appLogger.error("Carrito no encontrado");
//       return res.status(404).json({ error: "Carrito no encontrado" });
//     }
//     appLogger.info("Carrito obtenido correctamente");
//     return res.status(200).json(cart);
//   } catch (err) {
//     appLogger.error("Error al obtener el carrito", err);
//     return res.status(500).json({ error: "Error al obtener el carrito" });
//   }
// };

// Crear un nuevo carrito
// export const createCart = async (req, res) => {
//   try {
//     const newCart = await CartService.createCart();
//     if (!newCart) {
//       appLogger.error("No se pudo crear el carrito");
//       return res.status(400).json({ error: "No se pudo crear el carrito" });
//     }
//     appLogger.info("Carrito creado correctamente");
//     return res.status(201).json(newCart);
//   } catch (err) {
//     appLogger.error("Error al crear el carrito", err);
//     return res.status(500).json({ error: "Error al crear el carrito" });
//   }
// };

// Actualizar un carrito (agregar productos)

// export const updateCart = async (req, res) => {
//   try {
//     const { cid, pid } = req.params;
//     const product = await ProductsService.getProduct(pid);

//     if (!product) {
//       appLogger.error("Producto no encontrado");
//       return res.status(404).json({ error: "Producto no encontrado" });
//     }
//     // Buscar carrito existente
//     let cart = await CartService.getCart(cid);

//     // Si no existe, crear uno nuevo
//     if (!cart) {
//       cart = await CartService.createCart();
//     }

//     // Buscar si el producto ya existe en el carrito
//     const existingItem = cart.products.findIndex((p) => {
//       p._id == pid;
//     });
//     console.log(existingItem);

//     if (existingItem === -1) {
//       cart.products.push({ product: product._id, quantity: 1 });
//       appLogger.info("Producto agregado al carrito");
//     } else {
//       cart.products[existingItem].quantity += 1;
//       appLogger.info("Cantidad del producto en el carrito actualizada");
//     }

//     // Guardar carrito
//     const updatedCart = await CartService.updateCart(cart._id, cart);

//     appLogger.info("Carrito actualizado correctamente");
//     return res.status(200).json(updatedCart);
//   } catch (err) {
//     appLogger.error("Error al actualizar el carrito", err);
//     return res.status(500).json({ error: "Error al actualizar el carrito" });
//   }
// };

// // Eliminar un carrito
// export const deleteCart = async (req, res) => {
//   try {
//     const cart = await CartService.getCart(req.params.cid);
//     if (!cart) {
//       appLogger.error("Carrito no encontrado");
//       return res.status(404).json({ error: "Carrito no encontrado" });
//     }
//     await CartService.deleteCart(req.params.cid);
//     appLogger.info("Carrito eliminado correctamente");
//     return res.status(200).json({ message: "Carrito eliminado correctamente" });
//   } catch (err) {
//     appLogger.error("Error al eliminar el carrito", err);
//     return res.status(500).json({ error: "Error al eliminar el carrito" });
//   }
// };

// // Vaciar un carrito
// export const clearCart = async (req, res) => {
//   try {
//     const cart = await CartService.getCart(req.params.cid);
//     if (!cart) {
//       appLogger.error("Carrito no encontrado");
//       return res.status(404).json({ error: "Carrito no encontrado" });
//     }
//     cart.products = [];
//     const updatedCart = await CartService.updateCart(req.params.cid, cart);
//     appLogger.info("Carrito vaciado correctamente");
//     return res.status(200).json(updatedCart);
//   } catch (err) {
//     appLogger.error("Error al vaciar el carrito", err);
//     return res.status(500).json({ error: "Error al vaciar el carrito" });
//   }
// };

// // Eliminar un producto del carrito
// export const removeProductFromCart = async (req, res) => {
//   try {
//     const cart = await CartService.getCart(req.params.cid);

//     if (!cart) {
//       appLogger.error("Carrito no encontrado");
//       return res.status(404).json({ error: "Carrito no encontrado" });
//     }
//     const productIndex = cart.products.findIndex((item) => item.product._id == req.params.pid);
//     if (productIndex === -1) {
//       appLogger.error("El producto no está en el carrito");
//       return res.status(404).json({ error: "El producto no está en el carrito" });
//     }
//     cart.products.splice(productIndex, 1);
//     const updatedCart = await CartService.updateCart(req.params.cid, cart);
//     appLogger.info("Producto eliminado del carrito correctamente");
//     return res.status(200).json(updatedCart);
//   } catch (err) {
//     appLogger.error("Error al eliminar el producto del carrito", err);
//     return res.status(500).json({ error: "Error al eliminar el producto del carrito" });
//   }
// };

// // Actualizar cantidad de un producto en el carrito
// export const updateProductQuantityInCart = async (req, res) => {
//   try {
//     const { quantity } = req.body;
//     const cart = await CartService.getCart(req.params.cid);

//     if (!cart) {
//       appLogger.error("Carrito no encontrado");
//       return res.status(404).json({ error: "Carrito no encontrado" });
//     }

//     const productIndex = cart.products.findIndex((item) => item.product._id == req.params.pid);
//     if (productIndex === -1) {
//       appLogger.error("El producto no está en el carrito");
//       return res.status(404).json({ error: "El producto no está en el carrito" });
//     }
//     cart.products[productIndex].quantity = quantity;
//     const updatedCart = await CartService.updateCart(req.params.cid, cart);
//     appLogger.info("Cantidad del producto en el carrito actualizada correctamente");
//     return res.status(200).json(updatedCart);
//   } catch (err) {
//     appLogger.error("Error al actualizar la cantidad del producto en el carrito", err);
//     return res
//       .status(500)
//       .json({ error: "Error al actualizar la cantidad del producto en el carrito" });
//   }
// };

// //Finalizar compra del carrito
// export const checkoutCart = async (req, res) => {
//   try {
//     const { cid } = req.params;
//     const cart = await CartService.getCart(cid);

//     if (!cart) {
//       appLogger.error("Carrito no encontrado");
//       return res.status(404).json({ error: "Carrito no encontrado" });
//     }

//     // Recorremos los productos del carrito
//     for (let item of cart.products) {
//       const product = await ProductsService.getProduct(item.product._id);

//       if (!product) {
//         appLogger.error(`Producto no encontrado`);
//         continue;
//       }

//       // Solo restamos stock si coincide color y talle
//       if (product.color === item.product.color && product.size === item.product.size) {
//         product.stock -= item.quantity;
//         if (product.stock <= 0) {
//           product.stock = 0;
//           product.status = false;
//         } else {
//           product.status = true;
//         }
//         await ProductsService.updateProduct(product._id, { stock: product.stock });
//       }
//     }

//     // Vaciar el carrito
//     cart.products = [];
//     const updatedCart = await CartService.updateCart(cid, cart);

//     appLogger.info("Compra finalizada correctamente");
//     return res.status(200).json({ message: "Compra finalizada correctamente", cart: updatedCart });
//   } catch (err) {
//     appLogger.error("Error al finalizar la compra del carrito", err);
//     return res.status(500).json({ error: "Error al finalizar la compra del carrito" });
//   }
// };
