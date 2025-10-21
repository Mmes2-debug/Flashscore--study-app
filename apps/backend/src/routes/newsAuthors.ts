import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

interface AuthorEventBody {
  authorId: string;
  eventType: string;
  eventData: any;
}

export async function newsAuthorsRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/author/event",
    async (req: FastifyRequest<{ Body: AuthorEventBody }>, reply: FastifyReply) => {
      try {
        const { authorId, eventType, eventData } = req.body;
        // handle event...
        return reply.status(200).send({ success: true });
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unknown error";
        return reply.status(500).send({ error: message });
      }
    }
  );
}