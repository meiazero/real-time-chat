import { OpenAPIHono } from "@hono/zod-openapi";
import { createAccountRoute } from "./create-account";

export const authRoutes = new OpenAPIHono();

authRoutes.route("/auth", createAccountRoute);
