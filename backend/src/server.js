require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

const courseRoutes = require("./routes/courseRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const { errorHandler } = require("./middleware/errorHandler");
const prisma = require("./config/database");

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ─────────────────────────────────────────────────────────────

// CORS configuration
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map(s => s.trim())
  : ["http://localhost:5173", "http://localhost:4173", "http://localhost:3000"];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (mobile apps, curl, etc.)
      if (!origin) return callback(null, true);
      
      // In development, be permissive to avoid 127.0.0.1 vs localhost issues
      if (process.env.NODE_ENV !== 'production') {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(null, false);
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Security headers
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});

// HTTP request logging
if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

// ─── Health Check ───────────────────────────────────────────────────────────
app.get("/api/health", async (req, res) => {
  try {
    // Verify database connectivity
    await prisma.$queryRaw`SELECT 1`;
    res.json({
      success: true,
      message: "Student Feedback API is running",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: "connected",
    });
  } catch (error) {
    res.status(503).json({
      success: false,
      message: "Service unavailable",
      database: "disconnected",
    });
  }
});

// ─── API Routes ─────────────────────────────────────────────────────────────
app.use("/api/courses", courseRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/auth", require("./routes/authRoutes"));

// ─── Serve Frontend in Production ───────────────────────────────────────────
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../../frontend/dist");
  app.use(express.static(frontendPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
} else {
  // ─── API Documentation (Root) — Development Only ────────────────────────
  app.get("/", (req, res) => {
    res.json({
      success: true,
      message: "📚 Student Course Feedback API",
      version: "1.0.0",
      endpoints: {
        health: "GET /api/health",
        auth: {
          register: "POST /api/auth/register",
          login: "POST /api/auth/login",
          me: "GET /api/auth/me",
          updateProfile: "PUT /api/auth/profile",
          changePassword: "PUT /api/auth/password",
        },
        courses: {
          getAll: "GET /api/courses?page=1&limit=10&search=&sortBy=createdAt&order=desc",
          getOne: "GET /api/courses/:id",
          create: "POST /api/courses (auth required)",
          fullUpdate: "PUT /api/courses/:id (admin only)",
          partialUpdate: "PATCH /api/courses/:id (admin only)",
          delete: "DELETE /api/courses/:id (admin only)",
        },
        feedback: {
          submit: "POST /api/feedback (auth required)",
          myFeedbacks: "GET /api/feedback/me (auth required)",
          getByCourse: "GET /api/feedback/course/:id?page=1&limit=10&rating=&sortBy=createdAt&order=desc",
          getAverage: "GET /api/feedback/course/:id/average",
          getOne: "GET /api/feedback/:id",
          delete: "DELETE /api/feedback/:id (auth required, owner or admin)",
        },
      },
    });
  });

  // ─── 404 Handler ──────────────────────────────────────────────────────────
  app.use((req, res) => {
    res.status(404).json({
      success: false,
      error: {
        message: `Route ${req.method} ${req.originalUrl} not found`,
      },
    });
  });
}

// ─── Global Error Handler ───────────────────────────────────────────────────
app.use(errorHandler);

// ─── Start Server ───────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`
  ╔══════════════════════════════════════════════════════╗
  ║                                                      ║
  ║   📚 Student Feedback API Server                     ║
  ║   🚀 Running on: http://localhost:${PORT}              ║
  ║   📋 API Docs:   http://localhost:${PORT}/              ║
  ║   ❤️  Health:     http://localhost:${PORT}/api/health    ║
  ║                                                      ║
  ╚══════════════════════════════════════════════════════╝
  `);
});

module.exports = app;
