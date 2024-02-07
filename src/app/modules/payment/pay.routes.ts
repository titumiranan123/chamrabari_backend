import express from "express";
import {
  getOrder,
  productPayment,
  orderConfirm,
  successOrder,
} from "./pay.controller";

const router = express.Router();
router.get("/", getOrder);
router.patch("/:id", orderConfirm);
router.post("/", productPayment);
router.post("/success/:id", successOrder);
router.post("/failed", async (req, res) => {
  return res.redirect(`http://localhost:5173/payment/failed`);
});
router.post("/cancel", async (req, res) => {
  return res.redirect(`http://localhost:5173/payment/success//payment/cancel`);
});

export default router;
