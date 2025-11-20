import { z } from 'zod';

export const ProductResponseDto = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  price: z.number(),
  stock: z.number(),
  category: z.string().nullable(),
  imageUrl: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type ProductResponseDtoType = z.infer<typeof ProductResponseDto>;
