import { z } from "zod";

const TextChannelSchema = z.object({
  id: z.string(),
  guild_id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  created_at: z.date().default(new Date()),
  updated_at: z.date().default(new Date()),
});

export type TextChannel = z.infer<typeof TextChannelSchema>;
