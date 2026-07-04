import { z } from "zod";

export const productSchema = z.object({
  code: z
    .string()
    .min(1, "Code is required")
    .max(50, "Code is too long"),

  name: z
    .string()
    .min(1, "Product name is required")
    .max(200, "Product name is too long"),

  barcode: z.string().optional(),

  category: z.string().optional(),

  unit: z.string().optional(),

  purchasePrice: z.coerce
    .number()
    .min(0, "Purchase price cannot be negative"),

  salePrice: z.coerce
    .number()
    .min(0, "Sale price cannot be negative"),

  stock: z.coerce
    .number()
    .min(0, "Stock cannot be negative"),

  minStock: z.coerce
    .number()
    .min(0, "Minimum stock cannot be negative")
    .optional(),

  description: z.string().optional(),
});

export type ProductFormValues = z.infer<typeof productSchema>;