import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

// ML service URL (FastAPI)
const ML_SERVICE_URL = process.env.ML_SERVICE_URL || "http://0.0.0.0:8000";

// Graceful fallback tracker
let mlFailures = 0;
const ML_FAILURE_THRESHOLD = 3;

// Request schemas
const PredictSchema = z.object({
  homeTeam: z.string(),
  awayTeam: z.string(),
  features: z.array(z.number()).length(7),
  enableAI: z.boolean().optional(),
});

const BatchSchema = z.object({
  predictions: z.array(z.array(z.number().length(7))),
});

export async function mlRoutes(server: FastifyInstance) {
  // Health check
  server.get("/ml-status", async (_req, reply) => {
    try {
      const resp = await fetch(`${ML_SERVICE_URL}/health`, {
        signal: AbortSignal.timeout(3000),
      });
      const data = await resp.json();
      return { status: "operational", mlService: data };
    } catch {
      return reply
        .status(503)
        .send({ status: "degraded", fallback: "rule-based predictions" });
    }
  });

  // Single prediction
  server.post("/predict", async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const body = PredictSchema.parse(req.body);

      if (mlFailures >= ML_FAILURE_THRESHOLD) {
        return reply.send({
          prediction: "unknown",
          confidence: 0,
          probabilities: { home: 0, draw: 0, away: 0 },
          model_version: "offline",
        });
      }

      const response = await fetch(`${ML_SERVICE_URL}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          features: body.features,
          homeTeam: body.homeTeam,
          awayTeam: body.awayTeam,
        }),
        signal: AbortSignal.timeout(10000),
      });

      if (!response.ok)
        throw new Error(`ML service returned ${response.status}`);

      const mlResult = await response.json();
      mlFailures = 0; // reset failures on success

      if (body.enableAI) {
        const enhanced = await fetch(`${ML_SERVICE_URL}/enhance`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prediction: mlResult,
            context: { homeTeam: body.homeTeam, awayTeam: body.awayTeam },
          }),
        }).then((res) => res.json());

        return {
          success: true,
          data: enhanced.prediction,
          aiInsights: enhanced.aiInsights,
          strategicAdvice: enhanced.strategicAdvice,
          magajico: {
            version: "MagajiCo-ML-v2.1-AI",
            ceo_approved: true,
            strategic_level: "executive",
            ai_enhanced: true,
          },
        };
      }

      return {
        success: true,
        data: mlResult,
        magajico: {
          version: "MagajiCo-ML-v2.0",
          ceo_approved: true,
          strategic_level: "executive",
        },
      };
    } catch (err: any) {
      mlFailures++;
      server.log.error(err);
      return reply.status(500).send({
        success: false,
        error: err.message || "Prediction failed, fallback engaged",
      });
    }
  });

  // Batch predictions
  server.post(
    "/predict/batch",
    async (req: FastifyRequest, reply: FastifyReply) => {
      try {
        const body = BatchSchema.parse(req.body);
        const resp = await fetch(`${ML_SERVICE_URL}/predict/batch`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ predictions: body.predictions }),
          signal: AbortSignal.timeout(30000),
        });
        return { success: true, ...(await resp.json()) };
      } catch (err: any) {
        server.log.error(err);
        return reply.status(500).send({ success: false, error: err.message });
      }
    },
  );

  // Train model proxy
  server.post("/train", async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const { data, labels } = req.body as {
        data: number[][];
        labels: number[];
      };
      const resp = await fetch(`${ML_SERVICE_URL}/train`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data, labels }),
        signal: AbortSignal.timeout(60000),
      });
      return { success: true, ...(await resp.json()) };
    } catch (err: any) {
      server.log.error(err);
      return reply.status(500).send({ success: false, error: err.message });
    }
  });
}
