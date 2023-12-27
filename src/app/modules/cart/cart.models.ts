import { Schema } from "mongoose";
import { cart } from "./cart.interface";
import { model } from "mongoose";

const cartSchema = new Schema<cart>({
    product_id: {
        type: String,
        required: true
    },

})

export const cartModel = model<cart>('cart', cartSchema)