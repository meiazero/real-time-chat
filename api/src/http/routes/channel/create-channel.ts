import { newId } from "@/utils/new-id";
import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { z } from "zod";

export const createChannelRoute = new OpenAPIHono();

const createChannelRouteDeclaration = createRoute({
  method: "post",
  path: "/create",
  description: "Create a new channel",
  summary: "Create a new channel",
  security: [
    {
      bearerAuth: [],
    },
  ],
  request: {},
  responses: {
    201: {
      description: "new channel created",
      content: {
        "application/json": {
          schema: z.object({
            id: z.string(),
          }),
        },
      },
    },
  },

  tags: ["Channel"],
});

createChannelRoute.openapi(createChannelRouteDeclaration, (c) => {
  return c.json({ id: newId("channel") }, 201);
});
