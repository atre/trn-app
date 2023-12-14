import crypto from 'crypto';
import { EmptyObject, IRequest, IResponse } from '../../../@types/interface';
import { IPlayRequest, IPlayResponse } from '../../../schema/play';
import { RabbitService } from '../../../service/rabbit/rabbit';

export class DiceController {
  entry: (
    req: IRequest<EmptyObject, IPlayRequest>,
    res: IResponse<IPlayResponse>,
  ) => Promise<IResponse<IPlayResponse>> = async (_req, res) => {
      const rabbit = await RabbitService.getInstance();

      const request = {
        id: crypto.randomUUID(),
        nickname: _req.user!.nickname,
        userId: _req.user!.userId,
      };

      const data = await rabbit.getDiceResult(request);

      return res.send({ data });
    };
}
export const diceController = new DiceController();
