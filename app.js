import express from "express";
import healthRoute from "./routes/health.route.js";
import authRoute from "./routes/auth.route.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api", healthRoute);
app.use("/api/auth", authRoute);

export default app;
