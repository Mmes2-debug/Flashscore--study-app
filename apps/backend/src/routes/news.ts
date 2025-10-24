
import { FastifyPluginAsync } from 'fastify';
import { News } from '../models/News.js';

const newsRoutes: FastifyPluginAsync = async (fastify) => {
  // Get all news articles
  fastify.get('/api/news', async (request, reply) => {
    try {
      const { limit = 10, skip = 0 } = request.query as any;

      const news = await News.find()
        .sort({ publishedAt: -1 })
        .limit(parseInt(limit))
        .skip(parseInt(skip))
        .lean();

      return reply.send({
        success: true,
        data: news,
        total: news.length
      });
    } catch (error) {
      fastify.log.error({ err: error }, 'Error fetching news');
      return reply.status(200).send({
        success: true,
        data: [],
        total: 0
      });
    }
  });

  // Get news by ID
  fastify.get('/api/news/:id', async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      const news = await News.findById(id);

      if (!news) {
        return reply.status(404).send({
          success: false,
          error: 'News article not found'
        });
      }

      return reply.send({
        success: true,
        data: news
      });
    } catch (error) {
      fastify.log.error({ err: error }, 'Error fetching news article');
      return reply.status(500).send({
        success: false,
        error: 'Failed to fetch news article'
      });
    }
  });
};

export { newsRoutes };
