import { Router } from 'express';
import { authRouter } from './api/v1/auth';

const router = Router();

router.use('/api/v1/auth/', authRouter);

export {
  router,
};
