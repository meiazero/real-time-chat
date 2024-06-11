import { z } from "zod";

const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  username: z.string(),
  email: z.string(),
  avatar: z.string(),
});

export type User = z.infer<typeof UserSchema>;
