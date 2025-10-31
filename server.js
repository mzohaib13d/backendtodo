require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const todoRoutes = require("./routes/todos");

const app = express();

// ✅ Middleware
// app.use(cors());
// Allow multiple origins (your frontend + local development)
const allowedOrigins = [
  'https://todomern01.netlify.app',
  'http://localhost:5173', // Vite default
  'http://localhost:3000'  // Create React App default
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(express.json());

// ✅ API routes
app.use("/api/todos", todoRoutes);

// ✅ For production (optional — if you later serve frontend from backend)
if (process.env.NODE_ENV === "production") {
  const __dirname1 = path.resolve();
  app.use(express.static(path.join(__dirname1, "/frontend/dist"))); // if React build inside backend folder

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "frontend", "dist", "index.html"));
  });
}

// ✅ Port setup
const PORT = process.env.PORT || 5000;

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));