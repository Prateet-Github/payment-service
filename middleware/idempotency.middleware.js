import prisma from "../config/prisma.js";
import { hashRequest } from "../utils/hash.js";

export const idempotency = async (req, res, next) => {
  const key = req.headers["idempotency-key"];
  const userId = req.user.id;

  if (!key) {
    return res.status(400).json({ message: "Idempotency-Key required" });
  }

  const requestHash = hashRequest(req.body);

  let existing = await prisma.idempotencyKey.findUnique({
    where: { key },
  });

  if (existing) {
    // different request
    if (existing.requestHash !== requestHash) {
      return res.status(400).json({
        message: "Idempotency key reused with different request",
      });
    }

    if (existing.status === "PROCESSING") {
      return res.status(409).json({
        message: "Request already processing",
      });
    }

    if (existing.status === "SUCCESS") {
      return res.json(existing.response);
    }
  }

  // for race condition: only one will succeed, others will fetch existing
  try {
    await prisma.idempotencyKey.create({
      data: {
        key,
        userId,
        requestHash,
        status: "PROCESSING",
      },
    });
  } catch (err) {
    if (err.code === "P2002") {
      console.log("Race detected → fetching existing");

      existing = await prisma.idempotencyKey.findUnique({
        where: { key },
      });

      if (existing.status === "SUCCESS") {
        return res.json(existing.response);
      }

      return res.status(409).json({
        message: "Request already processing",
      });
    }

    throw err;
  }

  req.idempotencyKey = key;
  next();
};
