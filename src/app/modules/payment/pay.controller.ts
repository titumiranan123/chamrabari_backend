import { Request, Response } from "express";
import mongoose from "mongoose";
import { PaymentModel } from "./pay.models";
import { ProductModel } from "../Product/product.model";
import { payment } from "./pay.interface";
const SSLCommerzPayment = require("sslcommerz-lts");
const store_id = "hotel654b12a0eb375";
const store_passwd = "hotel654b12a0eb375@ssl";
const is_live = false;
const trnId = new mongoose.Types.ObjectId().toString();

export const productPayment = async (req: Request, res: Response) => {
  const order = req.body;
  const productId = order.productId;
  const product = await ProductModel.findById({ _id: productId });

  const data = {
    total_amount: product?.price,
    currency: "BDT",
    tran_id: trnId, // use unique tran_id for each api call
    success_url: `http://localhost:3001/payment/success/${trnId}`,
    fail_url: "http://localhost:3001/payment/failed",
    cancel_url: "http://localhost:3001/payment/cancel",
    ipn_url: "http://localhost:3001/ipn",
    shipping_method: "Courier",
    product_name: "Computer.",
    product_category: "Electronic",
    product_profile: "general",
    cus_name: "Customer Name",
    cus_email: "customer@example.com",
    cus_add1: "Dhaka",
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: "01711111111",
    cus_fax: "01711111111",
    ship_name: "Customer Name",
    ship_add1: "Dhaka",
    ship_add2: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
  };

  try {
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    const apiResponse = await sslcz.init(data);
    // Redirect the user to the payment gateway
    let GatewayPageURL = apiResponse.GatewayPageURL;
    res.json({ url: GatewayPageURL });

    const finalOrder = {
      order: order,
      paidStatus: false,
      tranjectionId: trnId,
      updatedAt: getFormattedDate(),
      payment_track: new Date(),
      confirmStatus: false,
      total_amount: product?.price,
    };
    const res1 = new PaymentModel<payment>(finalOrder);
    await res1.save();
    return res1;
  } catch (error) {
    console.error("Error initializing payment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getOrder = async (req: Request, res: Response) => {
  const order = await PaymentModel.find();
  res.status(200).send(order);
};

export const orderConfirm = async (req: Request, res: Response) => {
  const updatedPayment = await PaymentModel.findOneAndUpdate(
    { tranjectionId: req.params.id },
    { $set: { confirmStatus: true } },
    { new: true }
  );
  res.status(200).json({ message: "Order Cofirmed", updatedPayment });
};

export const successOrder = async (req: Request, res: Response) => {
  try {
    const updatedPayment = await PaymentModel.findOneAndUpdate(
      { tranjectionId: req.params.id },
      { $set: { paidStatus: true } },
      { new: true }
    );

    if (!updatedPayment) {
      return res.status(404).json({ error: "Payment not found" });
    }

    // console.log("Updated payment:", updatedPayment);
    return res.redirect(
      `http://localhost:5173/payment/success/${req.params.id}`
    );
  } catch (error) {
    console.error("Error updating payment status:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

function getFormattedDate() {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.toLocaleString("default", { month: "short" });
  return `${month} ${day}`;
}
