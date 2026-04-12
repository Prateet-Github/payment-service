import prisma from "../config/prisma.js";
import stripe from "../config/stripe.js";

export const createPaymentIntent = async ({ userId, amount }) => {
  // 1. create order
  const order = await prisma.order.create({
    data: {
      userId,
      amount,
      status: "PENDING",
    },
  });

  // 2. create stripe paymentIntent
  const paymentIntent = await stripe.paymentIntents.create({
    amount, // smallest unit
    currency: "inr",
    metadata: {
      orderId: order.id,
      userId,
    },
  });

  // 3. store payment
  await prisma.payment.create({
    data: {
      orderId: order.id,
      provider: "stripe",
      paymentIntentId: paymentIntent.id,
      status: "PENDING",
    },
  });

  return {
    clientSecret: paymentIntent.client_secret,
    orderId: order.id,
  };
};
