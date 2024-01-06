import { Schema } from "mongoose";
import { cart } from "./cart.interface";
import { model } from "mongoose";

const cartSchema = new Schema<cart>({
    product_name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ['Men', 'Women', 'Children', 'Corporate'],
        required: true,
    },
    sub_category: {
        type: String,
        enum: [
            'Belt',
            'Wallet',
            'Long Wallet',
            'Purse',
            'loffer',
            'Shoe',
            'Sandel',
            'Half Shoe',
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
        required: true

    }

})

export const cartModel = model<cart>('cart', cartSchema)