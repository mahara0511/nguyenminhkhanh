import { z } from 'zod';
import { ProductResponseDto } from './product-response.dto';

export const ProductListResponseDto = z.object({
  items: z.array(ProductResponseDto),
  meta: z.object({
    total: z.number(),
    page: z.number(),
    limit: z.number(),
  }),
});

export type ProductListResponseDtoType = z.infer<typeof ProductListResponseDto>;
