import dotenv from "dotenv";

dotenv.config();

const env = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
};

const requiredVars = [
  "NODE_ENV",
  "PORT",
  "DATABASE_URL",
  "STRIPE_SECRET_KEY",
  "JWT_SECRET_KEY",
  "STRIPE_WEBHOOK_SECRET",
  "REDIS_HOST",
  "REDIS_PORT",
];

requiredVars.forEach((key) => {
  if (!env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});

export default env;
