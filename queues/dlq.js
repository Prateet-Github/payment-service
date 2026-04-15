import { paymentQueue } from "../queues/payment.queue.js";

const failedJobs = await paymentQueue.getFailed();

console.log("DLQ Jobs:", failedJobs.length);

failedJobs.forEach((job) => {
  console.log({
    id: job.id,
    data: job.data,
    error: job.failedReason,
  });
});
