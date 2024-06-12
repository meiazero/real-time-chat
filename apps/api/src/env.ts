import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  clientPrefix: "API_",
  server: {
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    HOST: z
      .string({
        invalid_type_error: "HOST must be a string",
        required_error: "HOST is required",
      })
      .default("0.0.0.0"),
    PORT: z.coerce
      .number({
        invalid_type_error: "PORT must be a number",
        required_error: "PORT is required",
      })
      .positive({
        message: "PORT must be a positive number",
      })
      .default(3333),
    DATABASE_URL: z.string().url({
      message: "DATABASE_URL must be a valid URL",
    }),
    JWT_SECRET: z.string().min(16, {
      message: "JWT secret must be at least 16 characters long",
    }),
    SESSION_SECRET: z.string().min(16, {
      message: "Session secret must be at least 16 characters long",
    }),
  },
  client: {},
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    HOST: process.env.HOST,
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    SESSION_SECRET: process.env.SESSION_SECRET,
  },
});
