import { z } from "zod";
import { mobileSchema } from "./otp";

export const orderItemSchema = z.object({
  productId: z.string().min(1),
  qtyKg: z.number().positive().max(100),
});

export const createOrderSchema = z.object({
  customerName: z.string().trim().min(2, "Enter your full name").max(100),
  mobile: mobileSchema,
  address: z.object({
    line1: z.string().trim().min(3, "Enter your address"),
    line2: z.string().trim().optional().default(""),
    city: z.string().trim().min(2, "Enter your city"),
    state: z.string().trim().min(2, "Enter your state"),
  }),
  pincode: z
    .string()
    .trim()
    .regex(/^\d{6}$/, "Enter a valid 6-digit pincode"),
  items: z.array(orderItemSchema).min(1, "Add at least one item to the order"),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
