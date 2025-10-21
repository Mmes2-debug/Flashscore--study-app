import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { NewsAuthorController } from '../controllers/newsAuthorController.js';
import { NewsAuthorService } from '../services/newsAuthorService.js';

export interface CreateAuthorBody {
  id: string;
  name: string;
  icon: string;
  bio?: string;
  expertise?: string[];
}

export interface CreateCollaborationBody {
  title: string;
  preview: string;
  fullContent: string;
  collaborationType: 'prediction' | 'analysis' | 'community' | 'update';
  tags?: string[];
}

export async function newsAuthorsRoutes(fastify: FastifyInstance) {

  // ====== Public Routes ======
  fastify.get('/api/news-authors', async (request, reply) => {
    try {
      const { limit = 10 } = request.query as { limit?: number };
      const authors = await NewsAuthorService.getActiveAuthors();
      return reply.send({ success: true, authors: authors.slice(0, limit), total: authors.length });
    } catch (error) {
      fastify.log.error({ err: error }, 'Error fetching news authors');
      return reply.status(500).send({ success: false, error: 'Failed to fetch news authors' });
    }
  });

  fastify.get('/api/news-authors/:id', async (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply
  ) => {
    try {
      const { id } = request.params;
      const author = await NewsAuthorService.getAuthorById(id);
      if (!author) return reply.status(404).send({ success: false, error: 'Author not found' });
      return reply.send({ success: true, author });
    } catch (error) {
      fastify.log.error({ err: error }, 'Error fetching author');
      return reply.status(500).send({ success: false, error: 'Failed to fetch author' });
    }
  });

  // ====== Member Routes (with Schema Validation) ======
  fastify.post<{ Body: CreateAuthorBody }>(
    '/news-authors',
    {
      schema: {
        body: {
          type: 'object',
          required: ['id', 'name', 'icon'],
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            icon: { type: 'string' },
            bio: { type: 'string' },
            expertise: { type: 'array', items: { type: 'string' } },
          },
        },
      },
    },
    async (request, reply) => {
      return NewsAuthorController.createOrUpdateAuthor(request, reply);
    }
  );

  fastify.post<{ Params: { id: string }; Body: CreateCollaborationBody }>(
    '/news-authors/:id/collaborations',
    {
      schema: {
        body: {
          type: 'object',
          required: ['title', 'preview', 'fullContent', 'collaborationType'],
          properties: {
            title: { type: 'string' },
            preview: { type: 'string' },
            fullContent: { type: 'string' },
            collaborationType: { type: 'string', enum: ['prediction', 'analysis', 'community', 'update'] },
            tags: { type: 'array', items: { type: 'string' }, nullable: true },
          },
        },
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'string' },
          },
        },
      },
    },
    async (request, reply) => {
      return NewsAuthorController.createCollaborationNews(request, reply);
    }
  );

  fastify.post('/news-authors/auto-news', (request, reply) =>
    NewsAuthorController.generateAutoNews(request, reply)
  );

  // ====== Internal / Admin Routes ======
  fastify.get('/authors/top', async (request, reply) => {
    try {
      const { limit = 10 } = request.query as any;
      const authors = await NewsAuthorService.getActiveAuthors();
      const topAuthors = authors
        .sort((a, b) => (b.collaborationCount || 0) - (a.collaborationCount || 0))
        .slice(0, parseInt(limit));

      return reply.send({ success: true, data: topAuthors });
    } catch (error) {
      fastify.log.error(error, 'Error fetching top authors');
      return reply.status(500).send({ success: false, error: 'Failed to fetch top authors' });
    }
  });
}