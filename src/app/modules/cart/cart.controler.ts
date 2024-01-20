import { NextFunction, Request, Response } from "express";
import { cartModel } from "./cart.models";


export const addCart = async (req: Request, res: Response) => {
    const cart = req.body;
    const cartDb = new cartModel(cart)
    await cartDb.save()
    res.status(200).json(cartDb)
}
export const getCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user_email = req.decoded.email;
        if (user_email !== req.query.email) {
            return res.status(404).json({ message: "Unauthorized" });
        }
        const cart = await cartModel.find({ user_email });

        if (!cart || cart.length === 0) {
            return res.status(404).json({ message: "Please add items to the cart" });
        }
        res.json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
export const delCart = async (req: Request, res: Response, next: NextFunction) => {

    const delcart = await cartModel.findByIdAndDelete({ _id: req.params.id })
    try {
        if (!delcart) {
            return res.status(404).json({ message: "product is not found" })
        }
        return res.status(200).json({ message: 'deleted' })
    } catch (err: any) {
        next(err)
    }
}