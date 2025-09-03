import { Schema, model } from "mongoose";

const variantSchema = new Schema(
  {
    color: { type: String },
    size: { type: String }, 
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
  },
  { _id: false }
);

const productSchema = new Schema(
  {
    brand: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    subCategory: String,
    thumbnails: [
      {
        url: String,
        public_id: String,
      },
    ], 
    variants: [variantSchema], 
  },
  { timestamps: true }
);

export default model("products", productSchema);

