import express from 'express'
import { addCart, delCart, getCart } from './cart.controler';
import { jwtVerify } from '../jwt/jwtRoutes';

const router = express.Router();
router.post('/cart', addCart)
router.get('/cart', jwtVerify, getCart)
router.delete('/cart/:id', delCart)


export default router;