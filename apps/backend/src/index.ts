import Fastify, { FastifyInstance } from "fastify";
import mongoose from "mongoose";
import { newsRoutes } from "./routes/news.js";
import { exec, ChildProcess } from "child_process";

const fastify: FastifyInstance = Fastify({ logger: true });

// ---------------------------
// JSON content header
// ---------------------------
fastify.addHook("onRequest", async (_request, reply) => {
  reply.header("Content-Type", "application/json");
});

// ---------------------------
// Python ML subprocess + Circuit Breaker
// ---------------------------
let pythonProcess: ChildProcess;
let mlFailures = 0;
const ML_FAILURE_THRESHOLD = 3;   // Max consecutive failures
const ML_RESTART_DELAY = 3000;    // ms before restarting ML

function startMLService() {
  fastify.log.info("🚀 Starting Python ML service...");
  pythonProcess = exec("uvicorn Ml.api_predict:app --host 127.0.0.1 --port 8000");

  pythonProcess.stdout?.on("data", (data) => console.log(`[Python]: ${data}`));
  pythonProcess.stderr?.on("data", (data) => console.error(`[Python Error]: ${data}`));

  pythonProcess.on("exit", (code) => {
    console.error(`⚠️ Python ML exited with code ${code}`);
    mlFailures++;

    if (mlFailures >= ML_FAILURE_THRESHOLD) {
      console.error("ML service failed repeatedly. Shutting down Fastify...");
      process.exit(1); // Render will restart container
    } else {
      console.log(`Restarting ML service in ${ML_RESTART_DELAY / 1000}s...`);
      setTimeout(startMLService, ML_RESTART_DELAY);
    }
  });
}

// Start ML subprocess
startMLService();

// ---------------------------
// Graceful shutdown
// ---------------------------
const shutdown = async () => {
  console.log("🛑 Shutting down servers...");
  pythonProcess.kill();
  await fastify.close();
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

// ---------------------------
// Health Check
// ---------------------------
fastify.get("/health", async () => {
  return { status: "ok", mlFailures };
});

// ---------------------------
// Start Fastify + MongoDB
// ---------------------------
const startServer = async () => {
  try {
    const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/sportscentral";
    await mongoose.connect(MONGO_URI);
    fastify.log.info("✅ MongoDB connected successfully");

    // Register routes
    await fastify.register(newsRoutes, { prefix: "/news" });

    const PORT = Number(process.env.PORT) || 3000;
    await fastify.listen({ port: PORT, host: "0.0.0.0" });
    fastify.log.info(`✅ Backend running at http://0.0.0.0:${PORT}`);
  } catch (err: unknown) {
    if (err instanceof Error) fastify.log.error("❌ Server error:", err.message);
    else fastify.log.error("❌ Server error:", err);
    process.exit(1);
  }
};

startServer();