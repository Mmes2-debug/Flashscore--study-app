import Fastify from "fastify";
import mongoose from "mongoose";
import { predictionsRoutes } from "./routes/predictions";

const fastify = Fastify({ logger: true });

fastify.register(predictionsRoutes, { prefix: "/api" });

const startServer = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/sportscentral");
    fastify.log.info("✅ MongoDB connected");

    const PORT = Number(process.env.PORT) || 3000;
    await fastify.listen({ port: PORT, host: "0.0.0.0" });
    fastify.log.info(`✅ Server running at http://0.0.0.0:${PORT}`);
  } catch (err: unknown) {
    fastify.log.error("❌ Server error:", err instanceof Error ? err.message : err);
    process.exit(1);
  }
};

startServer();