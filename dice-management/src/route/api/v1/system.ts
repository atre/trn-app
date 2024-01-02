import { Router } from 'express';
import { diceController } from '../../../controller/http/api/player';
import { asyncErrorHandler } from '../../../middleware/async-error-handler';

const router = Router();

router
  .route('/')
  .get(
    asyncErrorHandler(diceController.systemInfo),
  );

export const systemRouter = router;
