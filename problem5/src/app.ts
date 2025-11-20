import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { errorMiddleware } from './core/error.middleware';
import { logger } from './core/logger';
import routes from './routes/index';
export class App {
  public app = express();

  constructor() {
    this.initializeMiddlewares();
    this.initializeSwagger();
    this.initializeRoutes();
    this.initializeErrorHandler();
    this.initializeLogger();
  }

  private initializeMiddlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use((req, _res, next) => {
      logger.info(`${req.method} ${req.url}`);
      next();
    });
  }

  private initializeSwagger() {
    const { swaggerPaths, swaggerSchemas } = require('./swagger');

    const swaggerDocument = {
      openapi: '3.0.0',
      info: {
        title: 'E-commerce API',
        version: '1.0.0',
      },
      paths: swaggerPaths,
      components: {
        schemas: swaggerSchemas,
      },
    };

    this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }

  private initializeLogger() {
    this.app.use((req, res, next) => {
      const start = Date.now();

      // Log khi nhận request
      logger.info({
        event: 'REQUEST',
        method: req.method,
        url: req.url,
        body: req.body,
        query: req.query,
      });

      // Khi response kết thúc
      res.on('finish', () => {
        const duration = Date.now() - start;

        logger.info({
          event: 'RESPONSE',
          method: req.method,
          url: req.url,
          status: res.statusCode,
          duration: `${duration}ms`,
        });
      });

      next();
    });
  }

  private initializeRoutes() {
    this.app.use(routes);
  }

  private initializeErrorHandler() {
    this.app.use(errorMiddleware);
  }

  getInstance() {
    return this.app;
  }
}
