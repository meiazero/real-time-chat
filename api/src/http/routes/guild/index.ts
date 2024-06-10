import { OpenAPIHono } from "@hono/zod-openapi";
import { createGuildRoute } from "./create-guild";

export const guildRoutes = new OpenAPIHono();

guildRoutes.route("/guild", createGuildRoute);
