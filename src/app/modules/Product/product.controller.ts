import { Request, Response } from "express";
import { ProducttoDb } from "./product.service";
import { ProductModel } from "./product.model";
import { cartModel } from "../cart/cart.models";


export const postProduct = async (req: Request, res: Response) => {
    const product = req.body;
    console.log(product.discount)
    const data = await ProducttoDb(product)
    return res.status(200).json({ message: 'success', data });
}
export const getProduct = async (req: Request, res: Response) => {
    const products = await ProductModel.find()
    res.status(200).json(products)
}
export const getsingleProduct = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const product = await ProductModel.findOne({ _id: id })
        res.json(product)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}
export const deletProduct = async (req: Request, res: Response) => {
    try {
        const deletedProduct = await ProductModel.findByIdAndDelete({ _id: req.params.id })
        await cartModel.findByIdAndDelete({ _id: req.params.id })
        if (!deletedProduct) {
            return res.status(404).json({ message: "product is not found" })
        }
        return res.status(200).json({ message: 'deleted', deletedProduct });
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    const productId = req.params.id;
    const updatedProduct = await ProductModel.findByIdAndUpdate(
        productId,
        req.body,
        { new: true, runValidators: true }
    );
    if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json({ message: 'Product Update', updatedProduct });
}
