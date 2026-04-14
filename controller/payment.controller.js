import { createPaymentIntent } from "../service/payment.service.js";
import prisma from "../config/prisma.js";

export const createPayment = async (req, res) => {
  try {
    const { amount } = req.body;
    const userId = req.user.id;

    const result = await createPaymentIntent({ userId, amount });

    await prisma.idempotencyKey.update({
      where: { key: req.idempotencyKey },
      data: {
        status: "SUCCESS",
        response: result,
      },
    });

    res.json(result);
  } catch (error) {
    console.error("Payment error:", error);
    res.status(500).json({ message: "Payment creation failed" });
  }
};
