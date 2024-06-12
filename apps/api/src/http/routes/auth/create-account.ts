import { BadRequestError } from "@/http/errors/bad-request-error";
import { sql } from "@/lib/postgres";
import type { User } from "@/models/user";
import { newId } from "@/utils/new-id";
import bcrypt from "bcryptjs";
import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export async function createAccountRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/account/create",
    {
      schema: {
        tags: ["User"],
        summary: "create a new account to user",
        body: z.object({
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
        response: {
          200: z.object({}),
        },
      },
    },
    async (request, reply) => {
      const { name, username, email, password, avatar } = request.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      const userWithSameEmail = await sql`
          SELECT * FROM users WHERE email = ${email}
        `;

      if (userWithSameEmail[0]) {
        throw new BadRequestError("User with same email already exists");
      }

      try {
        await sql
          .begin(async (sql) => {
            const [user] = await sql`
                INSERT INTO users (
                  id,
                  name,
                  username,
                  email,
                  password,
                  avatar
                ) VALUES (
                  ${newId("user")},
                  ${name},
                  ${username},
                  ${email},
                  ${hashedPassword},
                  ${avatar}
                )
                  RETURNING id
                `;

            return user as User;
          })
          .then(async (userCreated) => {
            return reply.status(201).send({ id: userCreated.id });
          })
          .catch((error: any) => {
            throw new BadRequestError(error.message);
          });
      } catch (error: any) {
        throw new BadRequestError(error.message);
      }
    }
  );
}
