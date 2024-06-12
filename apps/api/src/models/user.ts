import { z } from "zod";

const UserSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  email: z.string().email(),
  username: z.string(),
  avatar: z.string().optional(),
  password: z.string(),
  created_at: z.date().default(new Date()),
  updated_at: z.date().default(new Date()),
});

export type User = z.infer<typeof UserSchema>;
