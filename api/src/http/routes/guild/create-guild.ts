import { newId } from "@/utils/new-id";
import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { z } from "zod";

export const createGuildRoute = new OpenAPIHono();

const createGuildRouteDeclaration = createRoute({
  method: "post",
  path: "/create",
  description: "Create a new guild",
  summary: "Create a new guild",
  security: [
    {
      bearerAuth: [],
    },
  ],
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({}),
        },
      },
    },
  },
  responses: {
    201: {
      description: "new guild created",
      content: {
        "application/json": {
          schema: z.object({
            id: z.string(),
          }),
        },
      },
    },
  },

  tags: ["Guild"],
});

createGuildRoute.openapi(createGuildRouteDeclaration, (c) => {
  return c.json({ id: newId("guild") }, 201);
});
