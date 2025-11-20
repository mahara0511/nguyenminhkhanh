import { Router } from 'express';
import { moduleRoutes } from './register';

const router = Router();

for (const m of moduleRoutes) {
  router.use(m.path, m.route());
}

export default router;
