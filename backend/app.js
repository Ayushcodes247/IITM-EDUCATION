import express from "express";
import dotenv from "dotenv";
import connectToDB from "./config/db.config.js";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import superAdminRouter from "./routes/superadmin/superadmin.routes.js";

// Load environment variables from .env file
dotenv.config();

const app = express();

// Connect to MongoDB
connectToDB();

// Middleware

// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Enable CORS (adjust origin as needed in production)
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*", // set your frontend URL in production
    credentials: true, // allow cookies to be sent
  })
);

// Parse cookies
app.use(cookieParser());

// Add security headers
app.use(helmet());

// Routes
app.use("/sadmin", superAdminRouter);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Internal server error:", err);
  res.status(500).json({ message: "Internal server error" });
});

export default app;
