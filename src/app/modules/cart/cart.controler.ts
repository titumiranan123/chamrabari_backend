import { Request, Response } from "express";
import { cartModel } from "./cart.models";

export const addCart = async (req: Request, res: Response) => {
    const cart = req.body;
    console.log(cart)
    const cartDb = new cartModel(cart)
    await cartDb.save()
    res.status(200).json(cartDb)

}
export const getCart = async (req: Request, res: Response) => {
    console.log(req.params)
    const cartData = await cartModel.find({ user_email: req.query.email });
    res.send(cartData)

}
export const delCart = async (req: Request, res: Response) => {
    console.log(req)
    const delcart = await cartModel.findByIdAndDelete({ _id: req.params.id })
    try {
        if (!delcart) {
            return res.status(404).json({ message: "product is not found" })
        }
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
}