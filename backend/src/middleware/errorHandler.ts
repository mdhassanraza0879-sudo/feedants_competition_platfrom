import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/apiResponse';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('🔥 Error caught in centralized errorHandler:', err);

  // Mongoose duplicate key error (code 11000)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    return sendError(res, `Duplicate key error: A record with that ${field} already exists`, 409);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e: any) => e.message);
    return sendError(res, `Validation failed: ${messages.join(', ')}`, 400, err.errors);
  }

  // CastError (e.g. invalid ObjectId)
  if (err.name === 'CastError') {
    return sendError(res, `Resource not found or invalid format: ${err.path}`, 400);
  }

  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || 'Internal Server Error';

  return sendError(res, message, statusCode);
};
