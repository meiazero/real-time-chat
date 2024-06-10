import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { z } from "zod";

export const userProfileRoute = new OpenAPIHono();

const userProfileRouteDeclaration = createRoute({
  method: "get",
  path: "/profile",
  description: "Get user profile",
  summary: "Get user profile",
  security: [
    {
      bearerAuth: [],
    },
  ],
  request: {},
  responses: {
    200: {
      description: "",
      content: {
        "application/json": {
          schema: z.object({}),
        },
      },
    },
    204: {
      description: "No content - successful operation",
    },
  },

  tags: ["User"],
});

userProfileRoute.openapi(userProfileRouteDeclaration, (c) => {
  return c.json({});
});
