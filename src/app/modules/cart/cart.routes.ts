import express from 'express'
import { addCart, delCart, getCart } from './cart.controler';
import { jwtVerify } from '../jwt/jwtRoutes';

const router = express.Router();
router.post('/', addCart)
router.get('/', jwtVerify, getCart)
router.delete('/:id', delCart)


export default router;