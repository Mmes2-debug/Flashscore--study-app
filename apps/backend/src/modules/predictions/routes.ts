
import { FastifyInstance } from "fastify";
import { predictionsRoutes } from "@/routes/prediction";

export async function predictionModuleRoutes(fastify: FastifyInstance) {
  await fastify.register(predictionsRoutes, { prefix: "/predictions" });
}
