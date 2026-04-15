import { Queue } from "bullmq";
import { redis } from "../config/redis.js";

export const paymentQueue = new Queue("payment-queue", {
  connection: redis,
  defaultJobOptions: {
    attempts: 5, // 5 retries on failure
    backoff: {
      type: "exponential",
      delay: 1000,
    },
    removeOnComplete: true,
    removeOnFail: false,
  },
});

export const addPaymentJob = async (data) => {
  await paymentQueue.add("process-payment", data);
};
