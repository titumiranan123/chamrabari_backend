import { Request, Response } from "express";
import { ProducttoDb } from "./product.service";
import { ProductModel } from "./product.model";


export const postProduct = async (req: Request, res: Response) => {
    const product = req.body
    await ProducttoDb(product)
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
        console.log(deletedProduct)
        if (!deletedProduct) {
            return res.status(404).json({ message: "product is not found" })
        }
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }

}

export const updateProduct = async (req: Request, res: Response) => {
    const id = req.params.id;
    const product = req.body;
    const updatedProduct = await ProductModel.findByIdAndUpdate({ _id: id, product, new: true })
    if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
    }
    res.json(updatedProduct);

}
