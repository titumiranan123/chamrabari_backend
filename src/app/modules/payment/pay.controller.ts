import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { PaymentModel } from './pay.models';
import { cart } from '../cart/cart.interface';
import { payment } from './pay.interface';
const SSLCommerzPayment = require('sslcommerz-lts');
const store_id = 'hotel654b12a0eb375';
const store_passwd = 'hotel654b12a0eb375@ssl';
const is_live = false; // true for live, false for sandbox
const trnId = new mongoose.Types.ObjectId().toString();

export const productPayment = async (req: Request, res: Response) => {
    const order = req.body;
    const data = {
        total_amount: 100,
        currency: 'BDT',
        tran_id: 'REF123', // use unique tran_id for each api call
        success_url: `http://localhost:3001/payment/success/${trnId}`,
        fail_url: 'http://localhost:3001/fail',
        cancel_url: 'http://localhost:3001/cancel',
        ipn_url: 'http://localhost:3001/ipn',
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: 'Customer Name',
        cus_email: 'customer@example.com',
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };

    try {
        const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
        const apiResponse = await sslcz.init(data);

        // Redirect the user to the payment gateway
        let GatewayPageURL = apiResponse.GatewayPageURL;
        res.json({ url: GatewayPageURL });
        console.log('Redirecting to: ', GatewayPageURL);

        const finalOrder = {
            order: order,
            paidStatus: false,
            tranjectionId: trnId
        };


        const res1 = new PaymentModel<payment>(finalOrder);
        console.log('Before save:', res1);

        await res1.save();
        console.log('After save:', res1);

    } catch (error) {
        console.error('Error initializing payment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default productPayment;
