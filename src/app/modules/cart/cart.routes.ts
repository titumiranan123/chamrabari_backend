import express, { Request, Response } from 'express'
import { addCart, delCart, getCart } from './cart.controler';

const router = express.Router();
router.post('/', addCart)
router.get('/', getCart)
router.delete('/:id', delCart)


export default router;