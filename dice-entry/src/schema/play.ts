import { RequestSchema } from '../types';

export interface IPlayRequest {
}

export interface IPlayResponse {
  isWin: boolean;
}

export const playRequestSchema: RequestSchema<IPlayRequest> = {};
