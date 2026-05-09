require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const courseRoutes = require("./routes/courseRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const { errorHandler } = require("./middleware/errorHandler");
const prisma = require("./config/database");

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ─────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

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

// ─── API Documentation (Root) ───────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "📚 Student Course Feedback API",
    version: "1.0.0",
    endpoints: {
      health: "GET /api/health",
      courses: {
        getAll: "GET /api/courses?page=1&limit=10&search=&sortBy=createdAt&order=desc",
        getOne: "GET /api/courses/:id",
        create: "POST /api/courses",
        fullUpdate: "PUT /api/courses/:id",
        partialUpdate: "PATCH /api/courses/:id",
        delete: "DELETE /api/courses/:id",
      },
      feedback: {
        submit: "POST /api/feedback",
        getByCourse: "GET /api/feedback/course/:id?page=1&limit=10&rating=&sortBy=createdAt&order=desc",
        getAverage: "GET /api/feedback/course/:id/average",
        getOne: "GET /api/feedback/:id",
        delete: "DELETE /api/feedback/:id",
      },
    },
  });
});

// ─── 404 Handler ────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: {
      message: `Route ${req.method} ${req.originalUrl} not found`,
    },
  });
});

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
