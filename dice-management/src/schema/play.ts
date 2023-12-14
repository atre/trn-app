import { RequestSchema } from '../types';

export interface IRegisterRequest {
  nickname: string;
  password: string;
}

export interface IRegisterResponse {
  nickname: string;
  token: string;
}

export const registerRequestSchema: RequestSchema<IRegisterRequest> = {
  body: {
    type: 'object',
    required: ['nickname', 'password'],
    properties: {
      nickname: {
        type: 'string',
        nullable: false,
      },
      password: {
        type: 'string',
        nullable: false,
      },
    },
    additionalProperties: false,
  },
};

export interface ILoginRequest {
  nickname: string;
  password: string;
}

export interface ILoginResponse {
  nickname: string;
  token: string;
}

export const loginRequestSchema: RequestSchema<ILoginRequest> = {
  body: {
    type: 'object',
    required: ['nickname', 'password'],
    properties: {
      nickname: {
        type: 'string',
        nullable: false,
      },
      password: {
        type: 'string',
        nullable: false,
      },
    },
    additionalProperties: false,
  },
};
