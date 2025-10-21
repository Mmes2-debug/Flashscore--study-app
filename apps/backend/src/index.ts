const startServer = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/sportscentral");
    fastify.log.info("✅ MongoDB connected successfully");

    await fastify.register(newsRoutes, { prefix: "/news" });

    const PORT = Number(process.env.PORT) || 3001;
    await fastify.listen({ port: PORT, host: "0.0.0.0" });
    fastify.log.info(`✅ Backend 💯 running at http://0.0.0.0:${PORT}`);
  } catch (err) {
    fastify.log.error("❌ Server never de:", err);
    process.exit(1);
  }
};

startServer();