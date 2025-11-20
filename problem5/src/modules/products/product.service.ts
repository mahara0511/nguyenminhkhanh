import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { AppDataSource } from '../../config/data-source';
import { Like } from 'typeorm';
export class ProductService {
  private repo: Repository<Product>;

  constructor() {
    this.repo = AppDataSource.getRepository(Product);
  }

  async findAll({
    search = '',
    sortBy = 'name',
    order = 'desc',
    limit = 20,
    page = 1,
  }) {
    const skip = (page - 1) * limit;

    const [products, total] = await this.repo.findAndCount({
      where: {
        name: Like(`%${search}%`),
      },
      order: {
        [sortBy]: order.toUpperCase(), // ASC / DESC
      },
      take: limit,
      skip,
    });
    return { products, total };
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  create(data: Partial<Product>) {
    const product = this.repo.create(data);
    return this.repo.save(product);
  }

  async update(id: number, data: Partial<Product>) {
    await this.repo.update(id, data);
    return this.findOne(id);
  }

  delete(id: number) {
    return this.repo.delete(id).then(() => ({ deleted: true }));
  }
}
