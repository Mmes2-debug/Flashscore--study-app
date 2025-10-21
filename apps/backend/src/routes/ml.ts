import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

export async function mlRoutes(fastify: FastifyInstance) {
  fastify.post("/predict", async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      // ML logic here
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error occurred";
      return reply.status(500).send({ error: message });
    }
  });

  fastify.get("/results", async (_req: FastifyRequest, reply: FastifyReply) => {
    try {
      // ML results logic here
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error occurred";
      return reply.status(500).send({ error: message });
    }
  });
}