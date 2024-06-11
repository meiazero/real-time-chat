import { BadRequestError } from "@/http/errors/bad-request-error";
import { openApiHono } from "@/lib/openapi-hono";
import { sql } from "@/lib/postgres";
import type { User } from "@/models/User";
import { newId } from "@/utils/new-id";
import { createRoute } from "@hono/zod-openapi";
import bcrypt from "bcryptjs";
import { z } from "zod";

export const createAccountRoute = openApiHono;

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
            name: z
              .string()
              .min(2, { message: "Name must be at least 2 characters" }),
            username: z
              .string()
              .min(2, { message: "Username must be at least 2 characters" }),
            email: z.string().email({
              message: "Invalid email",
            }),
            password: z
              .string()
              .min(5, { message: "Password must be at least 5 characters" }),
            avatar: z.string().url({
              message: "Invalid avatar",
            }),
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
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: z.object({}),
        },
      },
    },
  },

  tags: ["Auth"],
});

createAccountRoute.openapi(createAccountRouteDeclaration, async (c) => {
  const { name, username, email, password, avatar } = await c.req.json();

  const hashedPassword = await bcrypt.hash(password, 10);
  const userWithSameEmail = await sql`
    SELECT id FROM users WHERE email = ${email}
  `;

  if (userWithSameEmail) {
    c.json("User with same email already exists.");
  }

  try {
    const userCreated = await sql
      .begin(async (sql) => {
        const [user] = await sql`
      insert into users (
        id,
        name,
        username,
        email,
        password,
        avatar
      ) values (
        ${newId("user")},
        ${name},
        ${username},
        ${email},
        ${hashedPassword},
        ${avatar}
      )`;

        return user as User;
      })
      .catch((error: any) => {
        throw new BadRequestError(error.message);
      });

    return c.json({ id: userCreated!.id }, 201);
  } catch (error: any) {
    return c.json({ message: error.message }, 500);
  }
});
