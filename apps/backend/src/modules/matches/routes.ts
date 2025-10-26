
import { FastifyInstance } from "fastify";
import { matchRoutes } from "@/routes/matches";

export async function matchModuleRoutes(fastify: FastifyInstance) {
  await fastify.register(matchRoutes);
}
