import dotenv from "dotenv";

dotenv.config();

const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 5001,
  DATABASE_URL: process.env.DATABASE_URL,
};

const requiredVars = [
  "NODE_ENV",
  "PORT",
  "DATABASE_URL",
];

requiredVars.forEach((key) => {
  if (!env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});

export default env;