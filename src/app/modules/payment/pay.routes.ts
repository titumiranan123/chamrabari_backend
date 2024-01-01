import express from 'express'
import productPayment from './pay.controller';

const router = express.Router();

router.get('/',)
router.post('/', productPayment)
// router.post('/payment/success/:trnId', postTrntoDb)

export default router