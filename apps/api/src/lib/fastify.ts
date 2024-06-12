import { env } from "@/env";
import Fastify, { type FastifyInstance } from "fastify";

const fastify: FastifyInstance = Fastify({
  logger: {
    level: !!env.NODE_ENV ? "info" : "debug",
  },
});

export default fastify;
