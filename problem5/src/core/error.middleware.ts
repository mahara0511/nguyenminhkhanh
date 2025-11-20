import { Request, Response, NextFunction } from 'express';
import { AppError } from './AppError';
import { logger } from './logger';
export function errorMiddleware(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  logger.error({
    message: err.message,
    stack: err.stack,
    url: _req.url,
  });

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  return res.status(500).json({
    success: false,
    message: 'Internal Server Error',
  });
}
