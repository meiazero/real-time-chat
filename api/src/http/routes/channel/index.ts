import { OpenAPIHono } from "@hono/zod-openapi";
import { createChannelRoute } from "./create-channel";

export const channelRoutes = new OpenAPIHono();

channelRoutes.route("/channel", createChannelRoute);
