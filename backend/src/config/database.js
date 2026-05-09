require("dotenv").config();
const { PrismaClient } = require("../../generated/prisma");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");

// Create a PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,                        // Maximum connections in pool
  idleTimeoutMillis: 30000,       // Close idle connections after 30s
  connectionTimeoutMillis: 5000,  // Fail if can't connect within 5s
});

// Create the Prisma adapter using the pg pool
const adapter = new PrismaPg(pool);

// Prisma v7: Requires a driver adapter for direct database connections
const prisma = new PrismaClient({
  adapter,
  log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
});

// Graceful shutdown handler
async function disconnectDatabase() {
  await prisma.$disconnect();
  await pool.end();
  console.log("📦 Database disconnected gracefully");
}

process.on("SIGINT", async () => {
  await disconnectDatabase();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await disconnectDatabase();
  process.exit(0);
});

module.exports = prisma;
