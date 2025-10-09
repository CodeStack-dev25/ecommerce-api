import { Schema, model } from "mongoose";

const settingsSchema = new Schema(
  {
    discount: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export default model("Settings", settingsSchema);
