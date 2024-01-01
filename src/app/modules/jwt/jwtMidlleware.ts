import { NextFunction, Request, Response } from "express";
import 'dotenv/config'
const jwt = require('jsonwebtoken')
export const verifuser = async (req: Request, res: Response, next: NextFunction) => {
    const jwts = jwt.sign({
        data: 'foobar'
    }, 'secret', { expiresIn: '1h' })
    // next()
    console.log(req.body)
}