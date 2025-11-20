import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Product } from '../modules/products/entities/product.entity';
import * as dotenv from 'dotenv';

dotenv.config();
export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL || '',

  ssl: {
    rejectUnauthorized: false,
  },

  entities: [Product],
  migrations: ['src/migrations/*.ts'],

  synchronize: false,
  logging: false,
});
