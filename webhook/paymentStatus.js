import prisma from "../config/prisma.js";

export const handlePaymentSuccess = async (paymentIntent) => {
  try {
    const orderId = paymentIntent.metadata?.orderId;

    if (!orderId) {
      console.log("No orderId found → skipping");
      return;
    }

    const updated = await prisma.payment.updateMany({
      where: {
        paymentIntentId: paymentIntent.id,
        status: { not: "SUCCESS" },
      },
      data: {
        status: "SUCCESS",
      },
    });

    if (updated.count === 0) {
      console.log("Payment already processed → skipping");
      return;
    }

    await prisma.order.update({
      where: { id: orderId },
      data: {
        status: "PAID",
      },
    });

    console.log("Payment success processed:", paymentIntent.id);
  } catch (error) {
    console.error("Error handling payment success:", error);
  }
};

export const handlePaymentFailed = async (paymentIntent) => {
  try {
    const orderId = paymentIntent.metadata?.orderId;

    if (!orderId) return;

    const updated = await prisma.payment.updateMany({
      where: {
        paymentIntentId: paymentIntent.id,
        status: { not: "FAILED" },
      },
      data: {
        status: "FAILED",
      },
    });

    if (updated.count === 0) {
      console.log("Already processed → skipping");
      return;
    }

    await prisma.order.update({
      where: { id: orderId },
      data: {
        status: "FAILED",
      },
    });

    console.log("Payment failure processed:", paymentIntent.id);
  } catch (error) {
    console.error("Error handling payment failure:", error);
  }
};
