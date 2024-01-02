import { Router } from 'express';
import { authRouter } from './api/v1/auth';
import { systemRouter } from './api/v1/system';

const router = Router();

router.use('/api/v1/auth/', authRouter);
router.use('/api/system-info', systemRouter);

export {
  router,
};
