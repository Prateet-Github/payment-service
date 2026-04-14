import prisma from "../config/prisma.js";
import { hashRequest } from "../utils/hash.js";

export const idempotency = async (req, res, next) => {
  const key = req.headers["idempotency-key"];
  const userId = req.user.id;

  if (!key) {
    return res.status(400).json({ message: "Idempotency-Key required" });
  }

  const requestHash = hashRequest(req.body);

  const existing = await prisma.idempotencyKey.findUnique({
    where: { key },
  });

  if (existing) {
    if (existing.requestHash !== requestHash) {
      return res.status(400).json({
        message: "Idempotency key reused with different request",
      });
    }

    // Same request? return stored response
    if (existing.status === "SUCCESS") {
      return res.json(existing.response);
    }
  }

  // create new entry
  if (!existing) {
    await prisma.idempotencyKey.create({
      data: {
        key,
        userId,
        requestHash,
        status: "PROCESSING",
      },
    });
  }

  req.idempotencyKey = key;
  next();
};
