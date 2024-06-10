import { OpenAPIHono } from "@hono/zod-openapi";
import { logger } from "hono/logger";
import { env } from "./env";
import { authorRoute } from "./http/routes";

import { apiReference } from "@scalar/hono-api-reference";

const app = new OpenAPIHono();

app.use(logger());

app.doc("/openapi.json", {
  openapi: "3.0.0",
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

app.route("/author", authorRoute);

export default {
  host: "0.0.0.0",
  port: env.PORT || 3333,
  fetch: app.fetch,
};
