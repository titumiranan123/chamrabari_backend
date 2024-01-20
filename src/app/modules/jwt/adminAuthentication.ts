import { NextFunction, Request, Response } from "express";
import { userModel } from "../user/user.model";

export const adminAuthentication = async (req: Request, res: Response, next: NextFunction) => {
    const email = req.decoded.email;
    const query = { email: email }
    const user = await userModel.findOne(query)
    if (user?.role !== 'admn') {
        return res.status(403).send({ error: true, message: 'forbidden message' })
    }
    next()
}