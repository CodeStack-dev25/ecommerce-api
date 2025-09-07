import SalesRepository from "./repositories/pay.repository.js";
import ProductsService from "../products/products.service.js";

class SalesService {
  async createSale(data) {
    return await SalesRepository.create(data);
  }

  async updateSaleStatus(preferenceId, status, paymentId) {
    const updatedSale = await SalesRepository.updateStatus(preferenceId, {
      status,
      paymentId,
    });

    // Si el pago fue aprobado → descontar stock
    if (status === "approved" && updatedSale) {
      for (const item of updatedSale.items) {
        const product = await ProductsService.getProduct(item.productId);
        if (!product) continue;

        const variantIndex = product.variants.findIndex((v) => v.color === item.color && v.size === item.size);

        if (variantIndex !== -1) {
          product.variants[variantIndex].stock -= item.quantity;
          if (product.variants[variantIndex].stock < 0) {
            product.variants[variantIndex].stock = 0;
          }

          await ProductsService.updateProduct(product._id, {
            variants: product.variants,
          });
        }
      }
    }

    return updatedSale;
  }
}

export default new SalesService();
