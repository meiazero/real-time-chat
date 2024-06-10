import { newId } from "@/utils/new-id";
import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { z } from "zod";

export const sendMessageRoute = new OpenAPIHono();

const sendMessageRouteDeclaration = createRoute({
  method: "post",
  path: "/new",
  description: "Send a new message",
  summary: "Send a new message",
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
      description: "",
      content: {
        "application/json": {
          schema: z.object({
            id: z.string(),
          }),
        },
      },
    },
  },

  tags: ["Message"],
});

sendMessageRoute.openapi(sendMessageRouteDeclaration, (c) => {
  return c.json({ id: newId("message") }, 201);
});
