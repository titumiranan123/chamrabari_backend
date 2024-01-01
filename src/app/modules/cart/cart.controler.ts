import { Request, Response } from "express";
import { cartModel } from "./cart.models";

export const addCart = async (req: Request, res: Response) => {

    const cart = req.body;
    const cartDb = new cartModel(cart)
    await cartDb.save()
    res.status(200).json(cartDb)

}
export const getCart = async (req: Request, res: Response) => {
    const cart = await cartModel.find()
    res.send(cart)
}
export const delCart = async (req: Request, res: Response) => {
    const delcart = await cartModel.findByIdAndDelete({ _id: req.params.id })
    try {
        if (!delcart) {
            return res.status(404).json({ message: "product is not found" })
        }
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
}