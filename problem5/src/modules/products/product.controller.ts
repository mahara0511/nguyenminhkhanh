import { Request, Response } from 'express';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './dtos/product.dto';
import { AppError } from '@core/AppError';
import { removeUndefined } from '@utils/removeUndefined';
import { Product } from './entities/product.entity';
import { logger } from '@core/logger';
import { toProductResponse, toProductListResponse } from './product.mapper';

export class ProductController {
  private service: ProductService;

  constructor() {
    this.service = new ProductService();
  }

  async getAll(req: Request, res: Response) {
    const {
      search = '',
      sortBy = 'createdAt',
      order = 'desc',
      limit = '20',
      page = '1',
    } = req.query;

    const { products, total } = await this.service.findAll({
      search: String(search),
      sortBy: String(sortBy),
      order: String(order),
      limit: Number(limit),
      page: Number(page),
    });

    logger.info(`Fetched ${products.length} products`);

    return res.status(200).json({
      message: 'Products fetched successfully',
      data: toProductListResponse(products, total, Number(page), Number(limit)),
    });
  }

  async getOne(req: Request, res: Response) {
    const id = Number(req.params.id);

    logger.info(`Fetching product ${id}`);

    if (isNaN(id)) {
      logger.warn('Invalid product ID format');
      throw new AppError('Invalid product ID', 400);
    }

    const product = await this.service.findOne(id);
    if (!product) {
      logger.warn(`Product ${id} not found`);
      throw new AppError('Product not found', 404);
    }

    logger.info(`Fetched product ${id}`);

    return res.status(200).json({
      message: 'Product fetched successfully',
      data: toProductResponse(product),
    });
  }

  async create(req: Request, res: Response) {
    const parsed = CreateProductDto.parse(req.body);
    const cleaned = removeUndefined(parsed);

    const created = await this.service.create(cleaned as Partial<Product>);

    logger.info(`Product ${created.id} created`);

    return res.status(201).json({
      message: 'Product created successfully',
      data: toProductResponse(created),
    });
  }

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);

    logger.info(`Updating product ${id}`);

    if (isNaN(id)) {
      logger.warn('Invalid product ID');
      throw new AppError('Invalid product ID', 400);
    }

    const parsed = UpdateProductDto.parse(req.body);
    const cleaned = removeUndefined(parsed);

    const updated = await this.service.update(id, cleaned as Partial<Product>);
    if (!updated) {
      logger.warn(`Product ${id} not found for update`);
      throw new AppError('Product not found', 404);
    }

    logger.info(`Product ${id} updated`);

    return res.status(200).json({
      message: 'Product updated successfully',
      data: toProductResponse(updated),
    });
  }

  async remove(req: Request, res: Response) {
    const id = Number(req.params.id);
    logger.info(`Deleting product ${id}`);

    if (isNaN(id)) {
      logger.warn('Invalid product ID');
      throw new AppError('Invalid product ID', 400);
    }

    const deleted = await this.service.delete(id);

    if (!deleted) {
      logger.error(`Failed to delete product ${id}`);
      throw new AppError('Product deletion failed', 500);
    }

    logger.info(`Product ${id} deleted`);

    return res.status(200).json({
      message: 'Product deleted successfully',
      data: null,
    });
  }
}
