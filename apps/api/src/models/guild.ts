import { z } from "zod";

const GuildSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  owner: z.string().optional(),
  created_at: z.date().default(new Date()),
  updated_at: z.date().default(new Date()),
});

export type Guild = z.infer<typeof GuildSchema>;
