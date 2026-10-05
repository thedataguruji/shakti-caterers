import { z } from "zod";

export const mobileSchema = z
  .string()
  .trim()
  .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number");

export const otpRequestSchema = z.object({
  mobile: mobileSchema,
});

export const otpVerifySchema = z.object({
  mobile: mobileSchema,
  code: z.string().trim().regex(/^\d{6}$/, "Enter the 6-digit code"),
});
