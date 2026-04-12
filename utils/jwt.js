import jwt from "jsonwebtoken";
import env from "../config/env.js";

export const generateToken = (payload) => {
  return jwt.sign(payload, env.JWT_SECRET_KEY, { expiresIn: "7d" });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, env.JWT_SECRET_KEY);
  } catch (err) {
    return null;
  }
};
