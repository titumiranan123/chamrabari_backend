import { Schema, model } from "mongoose";
import { Product } from "./product.interface";

const productSchema = new Schema<Product>({
    product_name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ['men', 'women', 'children', 'corporate'],
        required: true,
    },
    sub_category: {
        type: String,
        enum: [
            'belt',
            'wallet',
            'long-wallet',
            'purse',
            'loffer',
            'shoe',
            'sandel',
            'half-shoe',
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
        type: String,
        required: true,
    },
});
export const ProductModel = model<Product>('Product', productSchema)