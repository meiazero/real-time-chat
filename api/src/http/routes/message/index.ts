import { OpenAPIHono } from "@hono/zod-openapi";
import { sendMessageRoute } from "./send-message";

export const messageRoutes = new OpenAPIHono();

messageRoutes.route("/message", sendMessageRoute);
