import { z } from "zod";

const MessageSchema = z.object({
  id: z.string(),
  content: z.string(),
  author: z.string().optional(),
  channel: z.string().optional(),
  created_at: z.date().default(new Date()),
  updated_at: z.date().default(new Date()),
});

export type Message = z.infer<typeof MessageSchema>;
