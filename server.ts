// src/server.ts
import fastify, { FastifyInstance } from 'fastify';
import tasksRoutes from './task'

const server: FastifyInstance = fastify({ logger: true });

// Register your routes
server.register(tasksRoutes);

const start = async () => {
  try {
    await server.listen(3000);
    server.log.info(`Server is running on ${server.server.address().port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
