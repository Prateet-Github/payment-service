import { Router } from "express";
import { createPayment } from "../controller/payment.controller.js";
import { auth } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/create", auth, createPayment);

export default router;
