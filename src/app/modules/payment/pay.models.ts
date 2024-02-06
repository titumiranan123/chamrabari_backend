import { Schema, model } from "mongoose";
import { payment } from "./pay.interface";

const paymentSchema = new Schema<payment>({
  order: {
    type: Schema.Types.Mixed,
  },
  paidStatus: { type: Boolean, required: true },
  tranjectionId: { type: String, required: true },
  updatedAt: { type: String, required: true },
  payment_track: { type: String, required: true },
  confirmStatus: { type: Boolean, required: true },
  total_amount: { type: Number, required: true },
});

export const PaymentModel = model<payment>("Payment", paymentSchema);
