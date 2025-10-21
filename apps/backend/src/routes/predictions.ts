// routes/predictions.ts
import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { predictor } from "../ml/predictor"; // your ML predictor instance

// ----------------------------
// Request Validation Schemas
// ----------------------------
const PredictionSchema = z.object({
  features: z.array(z.number().min(0).max(1)).length(7),
  match_context: z.record(z.string()).optional(),
});

const BatchPredictionSchema = z.object({
  predictions: z.array(PredictionSchema),
});

type PredictionRequestBody = z.infer<typeof PredictionSchema>;
type BatchPredictionRequestBody = z.infer<typeof BatchPredictionSchema>;

// ----------------------------
// Response Helpers
// ----------------------------
function successResponse(data: any) {
  return { success: true, data };
}

function errorResponse(message: string) {
  return { success: false, error: message };
}

// ----------------------------
// Routes
// ----------------------------
export default async function predictionRoutes(fastify: FastifyInstance) {
  // Single prediction
  fastify.post<{ Body: PredictionRequestBody }>("/predict", async (request, reply) => {
    try {
      const parsed = PredictionSchema.parse(request.body);

      const result = await predictor.predict(parsed.features);

      return reply.send(
        successResponse({
          prediction: result.prediction,
          confidence: result.confidence * 100,
          probabilities: Object.fromEntries(
            Object.entries(result.probabilities).map(([k, v]) => [k, v * 100])
          ),
          features_used: parsed.features,
          match_context: parsed.match_context,
          model_version: result.model_version,
        })
      );
    } catch (err: any) {
      fastify.log.error(err);

      if (err instanceof z.ZodError) {
        return reply.status(400).send(errorResponse(err.errors.map(e => e.message).join(", ")));
      }

      return reply.status(err.statusCode || 500).send(errorResponse(err.message || "Internal Server Error"));
    }
  });

  // Batch predictions
  fastify.post<{ Body: BatchPredictionRequestBody }>("/predict/batch", async (request, reply) => {
    try {
      const parsed = BatchPredictionSchema.parse(request.body);

      const predictions = parsed.predictions.map(predReq => {
        const result = predictor.predict(predReq.features);
        return {
          prediction: result.prediction,
          confidence: result.confidence * 100,
          probabilities: Object.fromEntries(
            Object.entries(result.probabilities).map(([k, v]) => [k, v * 100])
          ),
          features: predReq.features,
          match_context: predReq.match_context,
        };
      });

      return reply.send(
        successResponse({
          count: predictions.length,
          predictions,
          model_version: predictor.model_version,
        })
      );
    } catch (err: any) {
      fastify.log.error(err);

      if (err instanceof z.ZodError) {
        return reply.status(400).send(errorResponse(err.errors.map(e => e.message).join(", ")));
      }

      return reply.status(err.statusCode || 500).send(errorResponse(err.message || "Internal Server Error"));
    }
  });

  // Model info
  fastify.get("/model/info", async (_request, reply) => {
    try {
      const info = predictor.get_model_info();
      return reply.send(successResponse(info));
    } catch (err: any) {
      fastify.log.error(err);
      return reply.status(500).send(errorResponse(err.message || "Internal Server Error"));
    }
  });

  // Health check
  fastify.get("/health", async (_request, reply) => {
    try {
      return reply.send(
        successResponse({
          status: "ok",
          model_loaded: !!predictor.model,
          model_version: predictor.model_version,
        })
      );
    } catch (err: any) {
      fastify.log.error(err);
      return reply.status(500).send(errorResponse(err.message || "Internal Server Error"));
    }
  });
}