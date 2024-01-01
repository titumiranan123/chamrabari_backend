import { Schema, model } from "mongoose";
import { payment } from "./pay.interface";

const paymentSchema = new Schema<payment>({
    order: {
        name: { type: String, required: true },
        phone: { type: Number, required: true },
        quantity: { type: Number, required: true },
        DeliveryCharge: { type: Number, required: true },
        total_price: { type: Number, required: true },
        address: { type: String, required: true },
        area: { type: String, required: true },
        district: { type: String, required: true },
    },
    paidStatus: { type: Boolean, required: true },
    tranjectionId: { type: String, required: true },
});


export const PaymentModel = model<payment>('Payment', paymentSchema);
