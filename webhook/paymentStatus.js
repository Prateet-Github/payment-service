import prisma from "../config/prisma.js";

export const handlePaymentSuccess = async (paymentIntent) => {
  const orderId = paymentIntent.metadata.orderId;

  if (!orderId) return;

  await prisma.payment.updateMany({
    where: {
      paymentIntentId: paymentIntent.id,
    },
    data: {
      status: "SUCCESS",
    },
  });

  await prisma.order.update({
    where: { id: orderId },
    data: {
      status: "PAID",
    },
  });
};

export const handlePaymentFailed = async (paymentIntent) => {
  const orderId = paymentIntent.metadata.orderId;

  await prisma.payment.updateMany({
    where: {
      paymentIntentId: paymentIntent.id,
    },
    data: {
      status: "FAILED",
    },
  });

  await prisma.order.update({
    where: { id: orderId },
    data: {
      status: "FAILED",
    },
  });
};
