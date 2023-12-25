import express from 'express'
import { deletProduct, getProduct, getsingleProduct, postProduct, updateProduct } from './product.controller';


const router = express.Router();

router.get('/', getProduct)
router.post('/', postProduct)
router.get('/:id', getsingleProduct)
router.put('/:id', updateProduct)
router.delete('/:id', deletProduct)

export default router;