import { Router } from "express";
import {
  clearCart,
  createCart,
  deleteCart,
  getCart,
  listCart,
  removeProductFromCart,
  updateCart,
  updateProductQuantityInCart,
} from "./carts.controller.js";

const cartRouter = Router();

cartRouter.post("/", createCart);
cartRouter.get("/", listCart);
cartRouter.get("/:cid", getCart);
cartRouter.delete("/:cid", deleteCart);
cartRouter.delete("/:cid/products/:pid", removeProductFromCart);
cartRouter.put("/:cid", updateCart);
cartRouter.put("/:cid/products/:pid", updateProductQuantityInCart);
cartRouter.delete("/:cid", clearCart);

export default cartRouter;
