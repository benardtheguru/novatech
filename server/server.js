import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import connectDB from "./config/db.js";
import authRoutes from "./Routes/authRoutes.js";
import textRoutes from "./Routes/textRoutes.js";
import appointmentRoutes from "./Routes/appointmentRoutes.js";
import testResultRoutes from "./Routes/testResultRoutes.js";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: ["https://novatech-six-sigma.vercel.app", "http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connect to MongoDB
connectDB();

// Serve static files from React app
app.use(express.static(path.join(__dirname, "..", "frontend", "build")));

// API routes - must come after static files
app.use("/api/auth", authRoutes);
app.use("/api/test", textRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/results", testResultRoutes);

// API health check endpoint
app.get("/api", (req, res) => res.json({ msg: "NovaTech API is running" }));

// Handle React app routing - All non-API routes should serve the React app
app.get(["/", "/signup", "/login", "/user/dashboard", "/admin/dashboard"], (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "build", "index.html"));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
