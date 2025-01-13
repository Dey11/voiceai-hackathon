import { z } from "zod";

export const productObj = z.object({
  name: z.string().min(1, "Product name is required"),
  price: z.number().min(1, "Price is required"),
  description: z.string().min(1, "Description is required"),
});

export const customerObj = z.object({
  name: z.string().min(1, "Customer name is required"),
  context: z.string().min(1, "Customer context is required"),
});
