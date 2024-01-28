import { NextFunction, Request, Response } from "express";
import { cartModel } from "./cart.models";
import validator from 'validator';

export const addCart = async (req: Request, res: Response) => {
    const cart = req.body;
    console.log(cart)
    const cartDb = new cartModel(cart)
    await cartDb.save()
    res.status(200).json(cartDb)
}

export const getCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user_email = req.decoded.email;
        const reqEmail = req.query.email
        // Check if user_email is present
        if (!user_email) {
            return res.status(400).json({ message: "user_email is required" });
        }

        // // Check if user_email matches
        if (user_email !== req.query.email) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Validate user_email format
        if (!validator.isEmail(user_email && reqEmail)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
        // Query the database
        const cart = await cartModel.find({ user_email });

        return res.status(200).json(cart);
    } catch (error) {
        next(error);
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