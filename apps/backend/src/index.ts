import Fastify from "fastify";
import cors from "@fastify/cors";
import fastifyStatic from "@fastify/static";
import path from "path";
import { connectDB } from "@bconfig/db.js";
import matchRoutes from "@broutes/matches.js";
import newsRoutes from "@broutes/news.js";
import predictionRoutes from "@broutes/prediction.js";
import healthRoutes from "@broutes/health.js";
import authRoutes from "@broutes/auth.js";
import stripeRoutes from "@broutes/stripe.js";
import paymentRoutes from "@broutes/payment.js";
import foundationRoutes from "@broutes/foundation.js";
import errorRoutes from "@broutes/errors.js";
import newsAuthorRoutes from "@broutes/newsAuthors.js";
import authorRoutes from "@broutes/authors.js";
import { validateEnv, validateStripeEnv } from "@butils/index.js";

const fastify = Fastify({ logger: true });

// Enable CORS
fastify.register(cors, {
  origin: true,
  credentials: true
});

fastify.addHook("onRequest", async (_req, reply) => {
  reply.header("Content-Type", "application/json");
});

const startServer = async () => {
  try {
    // Connect to MongoDB (optional if REQUIRE_DB=false)
    await connectDB();

    // Register routes
    await fastify.register(healthRoutes);
    await fastify.register(authRoutes, { prefix: "/api/auth" });
    await fastify.register(predictionRoutes, { prefix: "/api/predictions" });
    await fastify.register(matchRoutes, { prefix: "/api" });
    await fastify.register(newsRoutes, { prefix: "/api/news" });
    await fastify.register(newsAuthorRoutes, { prefix: "/api/news-authors" });
    await fastify.register(foundationRoutes, { prefix: "/api" });
    await fastify.register(errorRoutes, { prefix: "/api" });
    await fastify.register(stripeRoutes, { prefix: "/api/stripe" });
    await fastify.register(paymentRoutes, { prefix: "/api/payments" });

    const PORT = Number(process.env.PORT) || 3001;
    await fastify.listen({ port: PORT, host: "0.0.0.0" });
    fastify.log.info(`✅ Backend running at http://0.0.0.0:${PORT}`);
    fastify.log.info(`📍 Core Routes Connected:`);
    fastify.log.info(`   ✓ Health & Monitoring: /health, /health/metrics`);
    fastify.log.info(`   ✓ Predictions: /api/predictions/* (ML-powered)`);
    fastify.log.info(`   ✓ Matches: /api/matches/* (MongoDB)`);
    fastify.log.info(`   ✓ News: /api/news/* (MongoDB)`);
    fastify.log.info(`   ✓ Authors: /api/news-authors/* (Service Layer)`);
    fastify.log.info(`   ✓ Foundation: /api/foundation/:userId (MongoDB)`);
    fastify.log.info(`   ✓ Errors: /api/errors/* (MongoDB)`);
    fastify.log.info(`   ✓ Authentication: /api/auth/* (JWT)`);
    fastify.log.info(`   ✓ Stripe Payments: /api/stripe/* (Stripe)`);
    fastify.log.info(`   ✓ Payments: /api/payments/* (General)`);
    fastify.log.info(`📊 Models: Match, News, NewsAuthor, Prediction, User, Foundation, ErrorLog, Payment`);
  } catch (err: unknown) {
    if (err instanceof Error) fastify.log.error(`❌ Server error: ${err.message}`);
    else fastify.log.error(`❌ Server error: ${err}`);
    process.exit(1);
  }
};

startServer();