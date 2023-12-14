import { Router } from 'express';
import { entryRouter } from './api/v1/entry';
import { auth } from '../middleware/auth';

const router = Router();

router.use('/api/v1/entry/', auth, entryRouter);

export {
  router,
};
