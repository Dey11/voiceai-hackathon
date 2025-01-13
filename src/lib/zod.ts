import { z } from "zod";

export const productObj = z.object({
  name: z.string().min(1, "Product name is required"),
  price: z.number().min(1, "Price is required"),
  description: z.string().min(1, "Description is required"),
});

export const customerObj = z.object({
  name: z.string().min(1),
  context: z.string().min(1),
  number: z.number().min(1000000000).max(9999999999),
});

export type CustomerType = z.infer<typeof customerObj>;
