import Fastify, { FastifyInstance } from "fastify";
import mongoose from "mongoose";
import { newsRoutes } from "./routes/news.js";

const fastify: FastifyInstance = Fastify({ logger: true });

// Optional JSON content type header (Fastify parses JSON by default)
fastify.addHook("onRequest", async (_request, reply) => {
  reply.header("Content-Type", "application/json");
});

const startServer = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/sportscentral");
    fastify.log.info("✅ MongoDB connected successfully");

    // Register routes
    await fastify.register(newsRoutes, { prefix: "/news" });

    const PORT = Number(process.env.PORT) || 3001;
    await fastify.listen({ port: PORT, host: "0.0.0.0" });
    fastify.log.info(`✅ Backend running at http://0.0.0.0:${PORT}`);
  } catch (err: unknown) {
    if (err instanceof Error) fastify.log.error("❌ Server error:", err.message);
    else fastify.log.error("❌ Server error:", err);
    process.exit(1);
  }
};

startServer();