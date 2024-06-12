import FastifyJwt from "@fastify/jwt";
import fastifyRateLimit from "@fastify/rate-limit";

import fastifyCompress from "@fastify/compress";
import fastifyCors from "@fastify/cors";
import FastifySwagger from "@fastify/swagger";
import ScalarApiReference from "@scalar/fastify-api-reference";
import {
  jsonSchemaTransform as JSONSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";

import { errorHandler } from "@/http/errors/error-handler";
import { reqId } from "@/http/middlewares/req-id";

import fastifyCookie from "@fastify/cookie";
import fastifySession from "@fastify/session";
import { createAccountRoute, healthCheck } from "./http/routes";

import { env } from "./env";
import fastify from "./lib/fastify";

fastify.register(FastifySwagger, {
  openapi: {
    info: {
      title: "API",
      description: "API",
      version: "0.0.1",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "Bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  transform: JSONSchemaTransform,
});

fastify.register(ScalarApiReference, {
  routePrefix: "/reference",
  configuration: {
    spec: {
      theme: "moon",
      content: () => fastify.swagger(),
    },
  },
});

fastify
  .withTypeProvider<ZodTypeProvider>()
  .setValidatorCompiler(validatorCompiler)
  .setSerializerCompiler(serializerCompiler)
  .setErrorHandler(errorHandler);

fastify.register(reqId);

fastify.register(fastifyRateLimit, {
  max: 15,
  timeWindow: "30 seconds",
});

fastify.register(fastifyCompress);
fastify.register(FastifyJwt, {
  secret: env.JWT_SECRET,
  sign: { algorithm: "HS256" },
});

fastify.register(fastifyCors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  logLevel: "info",
});

fastify.register(fastifyCookie, {
  prefix: "cookie_",
  algorithm: "sha256",
});
fastify.register(fastifySession, {
  cookieName: "sessionId",
  secret: env.SESSION_SECRET,
  cookie: {
    path: "/",
    secure: false, // Set to true if using HTTPS
    maxAge: 24 * 60 * 60 * 1000, // Session expiration time (in milliseconds)
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    httpOnly: true,
  },
});

// Routes registration
fastify.get("/", (request, reply) => {
  reply.redirect("/reference");
});

fastify.register(healthCheck);
fastify.register(createAccountRoute, {
  prefix: "/auth",
});

fastify
  .listen({
    port: env.PORT,
    host: env.HOST,
  })
  .then(() => {
    console.log(`⚡️ HTTP server running on ${env.HOST}:${env.PORT}`);
  });
