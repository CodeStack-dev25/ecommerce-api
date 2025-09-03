import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    brand: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    subCategory: String,
    color: { type: String },
    size: { type: String },
    price: { type: Number },
    stock: { type: Number, default: 0 },
    thumbnails: [
      {
        url: String,
        public_id: String,
      },
    ],
  },
  { timestamps: true, strict: false },
);

export default model("products", productSchema);
