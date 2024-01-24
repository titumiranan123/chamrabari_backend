import { Schema, model } from "mongoose";
import { Product } from "./product.interface";

const productSchema = new Schema<Product>({
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
    discount: {
        type: Number,
        required: true,
    },
});
export const ProductModel = model<Product>('Product', productSchema)