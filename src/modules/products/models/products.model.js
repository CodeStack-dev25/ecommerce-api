import { Schema, model } from "mongoose";

const variantSchema = new Schema({
  color: String,
  size: String,
  price: Number,
  stock: Number,
  images: [
    {
      url: String,
      public_id: String,
    },
  ],
});

const productSchema = new Schema(
  {
    brand: String,
    title: { type: String, required: true },
    description: { type: String, required: true },
    basePrice: { type: Number, required: true },
    stock: { type: Number, required: true },
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

export default model("Product", productSchema);