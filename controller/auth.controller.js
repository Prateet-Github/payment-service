import prisma from "../config/prisma.js";
import { hashPassword } from "../utils/password.js";

export const register = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return res
        .status(400)
        .json({ message: "Email, username, and password are required" });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: { email, username, passwordHash: hashedPassword },
    });

    res
      .status(201)
      .json({ message: "User registered successfully", userId: newUser.id });
  } catch (error) {
    console.error("Error in register controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
