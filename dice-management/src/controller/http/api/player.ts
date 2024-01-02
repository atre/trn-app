import { EmptyObject, IRequest, IResponse } from '../../../@types/express/interface';
import { knex } from '../../../db';
import { ConflictError } from '../../../errors/conflict-error';
import { UnauthorizedError } from '../../../errors/unauthorized-error';
import {
  ILoginRequest, ILoginResponse, IRegisterRequest, IRegisterResponse, ISystemInfoResponse,
} from '../../../schema/play';
import { AuthService } from '../../../service/auth';
import os from 'os';

export class PlayerController {
  register: (
    req: IRequest<EmptyObject, IRegisterRequest>,
    res: IResponse<IRegisterResponse>,
  ) => Promise<IResponse<IRegisterResponse>> = async (req, res) => {
      const { nickname, password } = req.body;

      // Check if user already exists
      const users = await knex.select('nickname').from('players').where('nickname', nickname);
      if (users.length > 0) {
        throw new ConflictError('User already exists');
      }

      // Hash password and save new user
      const hashedPassword = await AuthService.hashPassword(password);
      const [user] = await knex('players').insert({ nickname, password: hashedPassword }, ['id']);

      // Generate JWT token
      const token = AuthService.generateToken(user.id, nickname);

      const result: ILoginResponse = { nickname, token };
      return res.status(201).send({ data: result });
    };

  login: (
    req: IRequest<EmptyObject, ILoginRequest>,
    res: IResponse<ILoginResponse>
  ) => Promise<IResponse<ILoginResponse>> = async (req, res) => {
      const { nickname, password } = req.body;
      const user = await knex('players').where({ nickname }).first();

      if (!user) {
        throw new UnauthorizedError('Invalid credentials');
      }

      const validPassword = await AuthService.comparePasswords(password, user.password);

      if (!validPassword) {
        throw new UnauthorizedError('Invalid credentials');
      }

      const token = AuthService.generateToken(user.id, user.nickname);

      return res.json({ data: { nickname: user.nickname, token } });
    };

  systemInfo: (
    req: IRequest<EmptyObject>,
    res: IResponse<ISystemInfoResponse>
  ) => Promise<IResponse<ISystemInfoResponse>> = async (_req, res) => {
    const networkInterfaces = os.networkInterfaces();
    let serverIp = '';
    for (const netInterface in networkInterfaces) {
      for (const networkInterface of networkInterfaces[netInterface] || []) {
        if (networkInterface.family === 'IPv4' && !networkInterface.internal) {
          serverIp = networkInterface.address;
          break;
        }
      }
      if (serverIp) break;
    }    
    const hostname = os.hostname();
    const podName = process.env.MY_POD_NAME;
    const nodeName = process.env.MY_NODE_NAME;

    const result: ISystemInfoResponse = {
      ip: serverIp,
      hostname,
      podName: podName || 'N/A',
      nodeName: nodeName || 'N/A',
    };

    return res.send({data: result});
  };
}
export const diceController = new PlayerController();
