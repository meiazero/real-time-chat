import { OpenAPIHono } from "@hono/zod-openapi";
import { userProfileRoute } from "./profile";

export const userRoutes = new OpenAPIHono();

userRoutes.route("/user", userProfileRoute);
