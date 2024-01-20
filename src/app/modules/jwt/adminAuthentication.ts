import { NextFunction, Request, Response } from "express";
import User from "../userAuthentication/user.model";

interface decodedUser {
    email: string
}
interface customRequest {
    decoded?: decodedUser
}
export const adminAuthentication = async (req: customRequest, res: Response, next: NextFunction) => {
    const email = req?.decoded?.email;
    const query = { email: email };
    const user = await User.findOne(query);
    if (user?.role !== 'ADMIN') {
        return res.status(403).send({ error: true, message: 'forbidden message' });
    }
    next();
};
