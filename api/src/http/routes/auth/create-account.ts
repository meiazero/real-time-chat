import { newId } from "@/utils/new-id";
import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { z } from "zod";

export const createAccountRoute = new OpenAPIHono();

const createAccountRouteDeclaration = createRoute({
  method: "post",
  path: "/account/create",
  description:
    "Create a new account with name, username, email, password and avatar",
  summary: "Create a new account",
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({
            name: z.string(),
            username: z.string(),
            email: z.string(),
            password: z.string(),
            avatar: z.string(),
          }),
        },
      },
    },
  },
  responses: {
    201: {
      description: "User created",
      content: {
        "application/json": {
          schema: z.object({
            id: z.string(),
          }),
        },
      },
    },
  },

  tags: ["Auth"],
});

createAccountRoute.openapi(createAccountRouteDeclaration, (c) => {
  return c.json({ id: newId("account") }, 201);
});
