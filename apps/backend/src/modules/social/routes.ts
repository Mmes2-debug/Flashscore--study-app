
import { FastifyInstance } from "fastify";

export async function socialModuleRoutes(fastify: FastifyInstance) {
  // Placeholder for future social features
  fastify.get("/social/health", async () => {
    return { status: "ok", module: "social" };
  });
}
