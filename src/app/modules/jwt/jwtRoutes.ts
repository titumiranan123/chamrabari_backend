import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'


export const jwtAuthentication = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.body;
        const token = jwt.sign(user, `${process.env.ACCESS_TOKEN}`, { expiresIn: '1h' })
        res.status(200).json(token)
    } catch (error) {
        next(error)
    }
}
export const jwtVerify = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorization = req.headers.authorization;

        if (!authorization) {
            res.status(401).json({ message: "unauthorized" })
        }
        const token = authorization?.split(' ')[1]
        jwt.verify(token as string, process.env.ACCESS_TOKEN as string, (err, decoded) => {
            if (err) {
                res.status(401).json({ message: "token expired" }) 
            }
            (req as any).decoded = decoded;
            next()
        })
    } catch (error) {
        next(error)
    }

}