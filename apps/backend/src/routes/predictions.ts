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
      return reply
        .status(503)
        .send({ error: "ML service unavailable. Please try later." });
    }

    try {
      // Call Python ML API
      const response = await axios.post("http://127.0.0.1:8000/predict", { features });
      mlFailures = 0; // reset on success
      return reply.status(200).send(response.data);
    } catch (err) {
      mlFailures++;
      return reply.status(500).send({ error: "Prediction failed", details: err instanceof Error ? err.message : err });
    }
  });
}