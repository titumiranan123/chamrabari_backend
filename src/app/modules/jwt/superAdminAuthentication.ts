import { NextFunction, Request, Response } from "express";
import User from "../userAuthentication/user.model";


export const superadminAuthentication = async (req: Request, res: Response, next: NextFunction) => {
    const email = req?.decoded?.email;
    const query = { email: email }
    const user = await User.findOne(query)
    if (user?.role !== 'SUPERADMIN') {
        return res.status(403).send({ error: true, message: 'forbidden message' })
    }
    next()
}