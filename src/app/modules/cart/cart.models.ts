import { Schema } from "mongoose";
import { cart } from "./cart.interface";
import { model } from "mongoose";

const cartSchema = new Schema<cart>({
  productId: {
    type: String,
    required: true,
  },
  product_name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["men", "women", "children", "corporate", "uni-sex"],
    required: true,
  },
  sub_category: {
    type: String,
    enum: [
      "belt",
      "wallet",
      "long-wallet",
      "purse",
      "loffer",
      "shoe",
      "sandel",
      "half-shoe",
      "bag",
      "combo",
      "gadget-cover",
    ],
    required: true,
  },

  Product_details: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  user_email: {
    type: String,
    required: true,
  },
});

export const cartModel = model<cart>("cart", cartSchema);
