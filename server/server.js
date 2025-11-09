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

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/novatech")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Serve static files from React app
app.use(express.static(path.join(__dirname, "..", "sen201project", "build")));

// API routes - must come after static files
app.use("/api/auth", authRoutes);
app.use("/api/test", textRoutes);

// API health check endpoint
app.get("/api", (req, res) => res.json({ msg: "NovaTech API is running" }));

// Handle React app routing - All non-API routes should serve the React app
app.get(["/", "/signup", "/login", "/user/dashboard", "/admin/dashboard"], (req, res) => {
  res.sendFile(path.join(__dirname, "..", "sen201project", "build", "index.html"));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
