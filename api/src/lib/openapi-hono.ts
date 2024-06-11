import { BadRequestError } from "@/http/errors/bad-request-error";
import { NotFoundError } from "@/http/errors/not-found-error";
import { UnauthorizedError } from "@/http/errors/unauthorized-error";
import { OpenAPIHono } from "@hono/zod-openapi";
import { ZodError } from "zod";

export const openApiHono = new OpenAPIHono();

openApiHono.onError(async (error, c) => {
  if (error instanceof ZodError) {
    return c.json(
      {
        message: "Validation error",
        errors: error.flatten().fieldErrors,
      },
      400
    );
  }

  if (error instanceof BadRequestError) {
    return c.json(
      {
        message: error.message,
      },
      400
    );
  }

  if (error instanceof UnauthorizedError) {
    return c.json(
      {
        message: error.message,
      },
      401
    );
  }

  if (error instanceof NotFoundError) {
    return c.json(
      {
        message: error.message,
      },
      404
    );
  }

  return c.json({ message: "Internal server error" }, 500);
});
