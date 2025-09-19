import { Schema, model } from "mongoose";

const saleSchema = new Schema(
  {
    user: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String },
      address: { type: String },
      city: { type: String },
      postsalCode: { type: String },
    },
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "products", required: true },
        title: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        color: { type: String },
        size: { type: String },
      },
    ],
    total: { type: Number, required: true },
    preferenceId: { type: String},
    paymentId: { type: String },
    comprobanteUrl: { type: String },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true },
);

export default model("Sale", saleSchema);
