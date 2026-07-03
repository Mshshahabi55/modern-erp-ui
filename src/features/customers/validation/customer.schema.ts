import { z } from "zod";

export const customerSchema = z.object({
  code: z
    .string()
    .trim()
    .min(1, "Code is required"),

  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters"),

  company: z.string().optional(),

  mobile: z.string().optional(),

  email: z
    .union([z.string().email("Invalid email"), z.literal("")])
    .optional(),

  creditLimit: z.coerce
    .number()
    .min(0, "Credit limit cannot be negative")
    .optional(),
});

export type CustomerFormValues = z.infer<typeof customerSchema>;