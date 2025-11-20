import { Product } from './entities/product.entity';
import { ProductResponseDtoType } from './dtos/product-response.dto';
import { ProductListResponseDtoType } from './dtos/product-list-response.dto';

export const toProductResponse = (entity: Product): ProductResponseDtoType => ({
  id: entity.id,
  name: entity.name,
  description: entity.description,
  price: Number(entity.price), // convert decimal-string → number
  stock: entity.stock,
  category: entity.category,
  imageUrl: entity.imageUrl ?? null,
  createdAt: entity.createdAt,
  updatedAt: entity.updatedAt,
});

export const toProductListResponse = (
  products: Product[],
  total: number,
  page: number,
  limit: number
): ProductListResponseDtoType => ({
  items: products.map(toProductResponse),
  meta: {
    total,
    page,
    limit,
  },
});
