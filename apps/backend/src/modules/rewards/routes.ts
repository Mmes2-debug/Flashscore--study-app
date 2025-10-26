
import { FastifyInstance } from "fastify";

export async function rewardsModuleRoutes(fastify: FastifyInstance) {
  // Placeholder for future rewards features
  fastify.get("/rewards/health", async () => {
    return { status: "ok", module: "rewards" };
  });
}
