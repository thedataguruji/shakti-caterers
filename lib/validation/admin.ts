import { z } from "zod";

export const adminLoginSchema = z.object({
  email: z.string().trim().email("Enter a valid email"),
  password: z.string().min(1, "Enter your password"),
});

export const statusUpdateSchema = z.object({
  status: z.enum([
    "PENDING",
    "CONFIRMED",
    "PACKED",
    "SHIPPED",
    "DELIVERED",
    "CANCELLED",
  ]),
  note: z.string().trim().max(500).optional().default(""),
});

export const productUpdateSchema = z.object({
  ratePerKg: z.number().positive().optional(),
  description: z.string().trim().min(10).optional(),
  shortDescription: z.string().trim().min(5).optional(),
  isActive: z.boolean().optional(),
});

export const settingsUpdateSchema = z.object({
  tax_percent: z.string().optional(),
  discount_percent: z.string().optional(),
  contact_email: z.string().optional(),
  contact_phone: z.string().optional(),
  contact_address: z.string().optional(),
  site_name: z.string().optional(),
});
