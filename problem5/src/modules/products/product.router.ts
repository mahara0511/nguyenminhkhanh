import { Router } from 'express';
import { ProductController } from './product.controller';

export const productRoute = () => {
  const router = Router();
  const controller = new ProductController();

  router.get('/', controller.getAll.bind(controller));
  router.get('/:id', controller.getOne.bind(controller));
  router.post('/', controller.create.bind(controller));
  router.patch('/:id', controller.update.bind(controller));
  router.delete('/:id', controller.remove.bind(controller));

  return router;
};
