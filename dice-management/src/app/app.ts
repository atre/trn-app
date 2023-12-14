import express, { Request, Response, NextFunction } from 'express';
import createError, { HttpError } from 'http-errors';
import {
  securityMiddleware,
} from '../middleware';
import { router } from '../route';
import { errorHandler } from '../middleware/error-handler';
import { commonMiddleware } from '../middleware/common';
import { httpLoggerMiddleware } from '../middleware/http-logger';

// ***********************

const app = express();

// global middlewares
app.enable('trust proxy');
app.use(httpLoggerMiddleware);
app.use(securityMiddleware);
app.use(commonMiddleware);

app.use(router);

app.use(errorHandler);
app.use((_req: Request, _res: Response, next: NextFunction) => next(createError(404)));
app.use((
  error: HttpError,
  _req: Request,
  res: Response,
): void => {
  const errStatus = error?.status || 500;
  res.status(errStatus).send({
    status: errStatus,
    message: error.message,
  });
});

export default app;
