import { Request, Response } from "express";

export const addCart = async (req: Request, res: Response) => {
    console.log(req.body)
}