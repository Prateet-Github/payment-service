import express from "express";
import stripe from "../config/stripe.js";
import env from "../config/env.js";
import { addPaymentJob } from "../queues/payment.queue.js";

const router = express.Router();

router.post(
  "/stripe",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        env.STRIPE_WEBHOOK_SECRET,
      );
    } catch (err) {
      console.error("Webhook signature verification failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle events
    switch (event.type) {
      case "payment_intent.succeeded":
        await addPaymentJob({
          type: "SUCCESS",
          paymentIntent: event.data.object,
        });
        break;

      case "payment_intent.payment_failed":
        await addPaymentJob({
          type: "FAILED",
          paymentIntent: event.data.object,
        });
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.status(200).json({ received: true });
  },
);

export default router;
