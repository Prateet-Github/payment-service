import { Worker } from "bullmq";
import { redis } from "../config/redis.js";
import {
  handlePaymentSuccess,
  handlePaymentFailed,
} from "../webhook/paymentStatus.js";

export const paymentWorker = new Worker(
  "payment-queue",
  async (job) => {
    const { type, paymentIntent } = job.data;

    console.log("Processing job:", type, paymentIntent.id);

    if (type === "SUCCESS") {
      await handlePaymentSuccess(paymentIntent);
    }

    if (type === "FAILED") {
      await handlePaymentFailed(paymentIntent);
    }
  },
  {
    connection: redis,
  },
);

paymentWorker.on("ready", () => {
  console.log("Payment worker is ready");
});

paymentWorker.on("completed", (job) => {
  console.log(`Job completed: ${job.id}`);
});

paymentWorker.on("failed", (job, err) => {
  console.error(`Job failed: ${job.id}`, err.message);
});
