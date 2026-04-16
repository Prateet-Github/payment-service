# Payment Service

Built a production-grade payment system with Stripe, implementing idempotent APIs, race-condition-safe processing, and a BullMQ-based async queue with retries and DLQ for fault-tolerant payment handling.

---

## Features

- Cookie-based authentication (JWT)
- Stripe PaymentIntent integration
- Webhook-based payment confirmation (source of truth)
- Idempotent APIs (prevents duplicate requests)
- Race-condition safe processing
- Async job processing with BullMQ (Redis)
- Retry mechanism with exponential backoff
- Dead Letter Queue (DLQ) for failed jobs

---

## Tech Stack

- Node.js
- Prisma + PostgreSQL
- Stripe
- BullMQ + Redis
