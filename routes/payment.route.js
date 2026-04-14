import { Router } from "express";
import { createPayment } from "../controller/payment.controller.js";
import { auth } from "../middleware/auth.middleware.js";
import { idempotency } from "../middleware/idempotency.middleware.js";

const router = Router();

router.post("/create", auth, idempotency, createPayment);

export default router;
