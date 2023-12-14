import { Response, Request, NextFunction } from 'express';
import { errorSerializerStrategy } from '../errors/strategies/error-serializer.strategy';

export const errorHandler = async (
  err: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
): Promise<any> => {
  (res as any).err = err;

  const errorResponse = errorSerializerStrategy.serializeError(err);
  return res.status(errorResponse?.statusCode || 500).send(errorResponse);
};
