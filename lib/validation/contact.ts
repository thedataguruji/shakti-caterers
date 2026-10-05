import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(100),
  mobile: z.string().trim().max(15).optional().default(""),
  email: z.string().trim().email().optional().or(z.literal("")).default(""),
  message: z.string().trim().min(5, "Enter a message").max(1000),
});
