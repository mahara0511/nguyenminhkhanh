import 'dotenv/config';
import { App } from './app';
import { AppDataSource } from './config/data-source';
import { logger } from './core/logger';

class Server {
  private port: number;

  constructor() {
    this.port = Number(process.env.PORT) || 8080;
  }

  async start() {
    try {
      await AppDataSource.initialize();
      logger.info('Database connected!');

      const app = new App().getInstance();

      app.listen(this.port, () => {
        logger.info(`Server running on port ${this.port}`);
        logger.info(`Swagger Docs: http://localhost:${this.port}/docs`);
      });
    } catch (err) {
      logger.error(`Failed to start server : ${(err as Error).message}`);
      process.exit(1);
    }
  }
}

new Server().start();
