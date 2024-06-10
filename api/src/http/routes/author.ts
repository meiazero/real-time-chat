import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { z } from "zod";

const authorRoute = new OpenAPIHono();

const authorRouteDeclaration = createRoute({
  method: "post",
  path: "/",
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({
            foo: z.string(),
          }),
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({
            bar: z.string(),
          }),
        },
      },
      description: "bar response",
    },
  },
  tags: ["Foo"],
});

authorRoute.openapi(authorRouteDeclaration, (c) => {
  return c.json({ bar: "hello foo" }, 200);
});

export { authorRoute };
