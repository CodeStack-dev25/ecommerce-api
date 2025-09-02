import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    brand: String,
    title: { type: String, required: true },
    description: { type: String, required: true },
    basePrice: { type: Number, required: true },
    stock: [
      {
        color: String,
        sizes: [
          {
            size: { type: String },
            quantity: { type: Number, default: 0 },
          },
        ],
      },
    ],
    category: { type: String, required: true },
    subCategory: String,
    thumbnails: [
      {
        url: String,
        public_id: String,
      },
    ],
  },
  { timestamps: true },
  { strict: false }
);

export default model("Product", productSchema);
