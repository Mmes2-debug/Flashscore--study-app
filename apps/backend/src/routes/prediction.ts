import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { mlPredictionService } from '../services/mlPredictionService.js';
import { aiEnhancementService } from '../services/aiEnhancementService.js';

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://0.0.0.0:8000';

export async function predictionsRoutes(fastify: FastifyInstance) {
  // 🩺 Health check
  fastify.get('/ml-status', async (_req: FastifyRequest, _rep: FastifyReply) => {
    return {
      status: 'operational',
      version: 'MagajiCo-ML-v2.1',
      timestamp: new Date().toISOString(),
    };
  });

  // ⚽ Single match prediction with optional AI enhancement
  fastify.post('/predict', async (req: FastifyRequest, rep: FastifyReply) => {
    try {
      const { homeTeam, awayTeam, features, enableAI } = req.body as {
        homeTeam: string;
        awayTeam: string;
        features: Record<string, any>;
        enableAI?: boolean;
      };

      if (!homeTeam || !awayTeam || !features) {
        return rep.status(400).send({ error: 'Missing required fields' });
      }

      const prediction = await mlPredictionService.predictMatch({
        homeTeam,
        awayTeam,
        features,
      });

      if (enableAI) {
        const enhanced = await aiEnhancementService.enhancePredictionWithInsights(
          prediction,
          { homeTeam, awayTeam },
        );

        return {
          success: true,
          data: enhanced.prediction,
          aiInsights: enhanced.aiInsights,
          strategicAdvice: enhanced.strategicAdvice,
        };
      }

      return { success: true, data: prediction };
    } catch (error) {
      fastify.log.error(error);
      return rep.status(500).send({
        success: false,
        error: error instanceof Error ? error.message : 'ML Prediction failed',
      });
    }
  });

  // 🧠 Batch prediction endpoint
  fastify.post('/predict/batch', async (req: FastifyRequest, rep: FastifyReply) => {
    try {
      const { predictions } = req.body as { predictions: any[] };

      if (!predictions || !Array.isArray(predictions)) {
        return rep.status(400).send({ error: 'Predictions array required' });
      }

      const result = await mlPredictionService.batchPredict(predictions);
      return { success: true, data: result };
    } catch (error) {
      fastify.log.error(error);
      return rep.status(500).send({
        success: false,
        error: error instanceof Error ? error.message : 'Batch prediction failed',
      });
    }
  });
}