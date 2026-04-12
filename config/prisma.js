import env from "./env.js";
import { PrismaClient } from "../generated/prisma/client.ts";

const prisma = new PrismaClient({
  accelerateUrl: env.DATABASE_URL,
});

export default prisma;
