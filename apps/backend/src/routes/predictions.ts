import { FastifyInstance } from "fastify";
import axios from "axios";
import { z } from "zod";

// ---------------------------
// Circuit breaker state
// ---------------------------
let mlFailures = 0;
const ML_FAILURE_THRESHOLD = 3;

// ---------------------------
// Prediction request schema
// ---------------------------
const predictionSchema = z.object({
  features: z
    .array(z.number())
    .length(7, "Exactly 7 features are required"),
});

// ---------------------------
// Fallback response
// ---------------------------
const fallbackPrediction = {
  prediction: "unknown",
  confidence: 0,
  probabilities: {
    home: 0,
    draw: 0,
    away: 0,
  },
  model_version: "offline",
  message: "ML service temporarily unavailable. Please try again later.",
};

// ---------------------------
// Register predictions route
// ---------------------------
export async function predictionsRoutes(fastify: FastifyInstance) {
  fastify.post("/predict", async (request, reply) => {
    // Validate request
    const parseResult = predictionSchema.safeParse(request.body);

    if (!parseResult.success) {
      return reply.status(400).send({ error: parseResult.error.errors });
    }

    const { features } = parseResult.data;

    // Circuit breaker: stop if too many failures
    if (mlFailures >= ML_FAILURE_THRESHOLD) {
      return reply.status(503).send(fallbackPrediction);
    }

    try {
      // Call Python ML API
      const response = await axios.post("http://127.0.0.1:8000/predict", { features });
      mlFailures = 0; // reset on success
      return reply.status(200).send(response.data);
    } catch (err) {
      mlFailures++;
      return reply.status(503).send(fallbackPrediction);
    }
  });
}