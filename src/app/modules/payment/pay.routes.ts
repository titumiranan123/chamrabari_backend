import express from 'express'
import { productPayment, successRoute } from './pay.controller';

const router = express.Router();

router.get('/',)
router.post('/', productPayment)
router.post('success/:trnId', successRoute)

export default router