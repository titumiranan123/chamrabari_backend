import express from 'express'
import { productPayment } from './pay.controller';
import { PaymentModel } from './pay.models';

const router = express.Router();

router.get('/',)
router.post('/', productPayment)
// router.post('/success', successRoute)
router.post('/success/:id', async (req, res) => {
    try {
        const updatedPayment = await PaymentModel.findOneAndUpdate(
            { tranjectionId: req.params.id },
            { $set: { paidStatus: true } },
            { new: true }
        );

        if (!updatedPayment) {
            return res.status(404).json({ error: 'Payment not found' });
        }

        console.log('Updated payment:', updatedPayment);
        return res.redirect(`http://localhost:5173/payment/success/${req.params.id}`);
    } catch (error) {
        console.error('Error updating payment status:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router