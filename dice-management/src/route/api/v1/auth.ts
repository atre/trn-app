import { Router } from 'express';
import { diceController } from '../../../controller/http/api/player';
import { asyncErrorHandler } from '../../../middleware/async-error-handler';
import { validator } from '../../../util/schema-validator';
import { loginRequestSchema, registerRequestSchema } from '../../../schema/play';

const router = Router();

router
  .route('/register')
  .post(
    validator.validate(registerRequestSchema),
    asyncErrorHandler(diceController.register),
  );

router.route('/login')
  .post(
    validator.validate(loginRequestSchema),
    asyncErrorHandler(diceController.login),
  );

export const authRouter = router;
