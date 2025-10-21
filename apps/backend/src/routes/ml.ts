// routes/ml.ts
import { FastifyInstance } from "fastify";
import fetch from "node-fetch";

export async function mlRoutes(fastify: FastifyInstance) {
  const ML_SERVICE_URL = process.env.ML_SERVICE_URL || "http://0.0.0.0:8000";

  fastify.post("/predict", async (request, reply) => {
    try {
      const response = await fetch(`${ML_SERVICE_URL}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request.body),
      });

      if (!response.ok) {
        const errText = await response.text();
        return reply.status(response.status).send({ error: errText });
      }

      const data = await response.json();
      return data;
    } catch (err) {
      return reply.status(500).send({ error: "ML Service unavailable", details: err.message });
    }
  });

  fastify.post("/predict/batch", async (request, reply) => {
    try {
      const response = await fetch(`${ML_SERVICE_URL}/predict/batch`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request.body),
      });

      const data = await response.json();
      return data;
    } catch (err) {
      return reply.status(500).send({ error: "ML Service unavailable", details: err.message });
    }
  });

  fastify.get("/health", async () => {
    const res = await fetch(`${ML_SERVICE_URL}/health`);
    return res.json();
  });
}