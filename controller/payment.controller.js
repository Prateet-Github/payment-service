import { createPaymentIntent } from "../service/payment.service.js";

export const createPayment = async (req, res) => {
  try {
    const { amount } = req.body;
    const userId = req.user.id;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const result = await createPaymentIntent({ userId, amount });

    res.json(result);
  } catch (error) {
    console.error("Payment error:", error);
    res.status(500).json({ message: "Payment creation failed" });
  }
};
