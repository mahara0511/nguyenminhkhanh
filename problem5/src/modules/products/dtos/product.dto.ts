import { z } from 'zod';

export const CreateProductDto = z.object({
  name: z.string().min(1),
  description: z.string().nullable().optional(),
  price: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, {
      message: 'Price must be a decimal string with up to 2 decimal places',
    }),
  stock: z.number().int().nonnegative(),
  category: z.string().nullable().optional(),
  imageUrl: z.string().url().nullable().optional(),
});

export type CreateProductDtoType = z.infer<typeof CreateProductDto>;

export const UpdateProductDto = CreateProductDto.partial();
export type UpdateProductDtoType = z.infer<typeof UpdateProductDto>;
