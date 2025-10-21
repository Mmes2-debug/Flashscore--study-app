// src/routes/mlRoutes.ts
import { FastifyInstance } from "fastify";

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || "http://0.0.0.0:8000";

export async function mlRoutes(server: FastifyInstance) {
  // Health check proxy
  server.get("/ml-status", async (_req, reply) => {
    try {
      const res = await fetch(`${ML_SERVICE_URL}/health`, { signal: AbortSignal.timeout(3000) });
      const data = await res.json();
      return { status: "operational", mlService: data };
    } catch (e: any) {
      return reply.status(503).send({ status: "degraded", error: e.message, fallback: "rule-based used" });
    }
  });

  // Prediction proxy
  server.post("/predict", async (req, reply) => {
    const body = req.body as Record<string, any>;
    try {
      const res = await fetch(`${ML_SERVICE_URL}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(10000)
      });
      const data = await res.json();
      return { success: true, data };
    } catch (e: any) {
      server.log.error(e);
      return reply.status(500).send({ success: false, error: e.message, fallback: "rule-based used" });
    }
  });

  // Batch prediction proxy
  server.post("/predict/batch", async (req, reply) => {
    const body = req.body as Record<string, any>;
    try {
      const res = await fetch(`${ML_SERVICE_URL}/predict/batch`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(30000)
      });
      const data = await res.json();
      return { success: true, data };
    } catch (e: any) {
      server.log.error(e);
      return reply.status(500).send({ success: false, error: e.message, fallback: "rule-based used" });
    }
  });

  // Model training proxy
  server.post("/ml/train", async (req, reply) => {
    const body = req.body as Record<string, any>;
    try {
      const res = await fetch(`${ML_SERVICE_URL}/train`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(60000)
      });
      const data = await res.json();
      return { success: true, data };
    } catch (e: any) {
      server.log.error(e);
      return reply.status(500).send({ success: false, error: e.message });
    }
  });
}