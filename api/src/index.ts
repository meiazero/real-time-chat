import { OpenAPIHono } from "@hono/zod-openapi";
import { logger } from "hono/logger";
import { env } from "./env";

import { apiReference } from "@scalar/hono-api-reference";
import {
  authRoutes,
  channelRoutes,
  guildRoutes,
  messageRoutes,
  userRoutes,
} from "./http/routes";

const app = new OpenAPIHono();

app.use(logger());

app.doc("/openapi.json", {
  openapi: "3.0.0",
  security: [
    {
      bearerAuth: [],
    },
  ],
  info: {
    version: "1.0.0",
    title: "My API",
  },
});

app.get(
  "/reference",

  apiReference({
    spec: {
      url: "/openapi.json",
    },
  })
);

app.get("/", (c) => {
  return c.redirect("/reference");
});

app.route("/", authRoutes);
app.route("/", userRoutes);
app.route("/", guildRoutes);
app.route("/", channelRoutes);
app.route("/", messageRoutes);

export default {
  host: "0.0.0.0",
  port: env.PORT || 3333,
  fetch: app.fetch,
};
