import { Router } from "express";
import {
  //clearCart,
  recibirJson,
  // deleteCart,
  // getCart,
  // listCart,
  // removeProductFromCart,
  // updateCart,
  // updateProductQuantityInCart,
  //checkoutCart,
} from "./carts.controller.js";

const cartRouter = Router();

cartRouter.post("/recibir-json", recibirJson);
//cartRouter.post("/", createCart);
// cartRouter.get("/", listCart);
// cartRouter.get("/:cid", getCart);
// cartRouter.delete("/:cid", deleteCart);
// cartRouter.delete("/:cid/products/:pid", removeProductFromCart);
// cartRouter.post("/:cid/products/:pid", updateCart);
// cartRouter.put("/:cid/products/:pid", updateProductQuantityInCart);
// cartRouter.delete("/:cid", clearCart);
// cartRouter.post("/:cid/checkout", checkoutCart);

export default cartRouter;
