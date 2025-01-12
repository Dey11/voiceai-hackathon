import { z } from "zod";

export const productObj = z.object({
  name: z.string().min(1, "Product name is required"),
  price: z.number().min(1, "Price is required"),
  description: z.string().min(1, "Description is required"),
});

export const editProductObj = z.object({
  id: z.string().min(1, "Product id is required"),
  name: z.string().min(1, "Product name is required"),
  price: z.number().min(1, "Price is required"),
  description: z.string().min(1, "Description is required"),
});
