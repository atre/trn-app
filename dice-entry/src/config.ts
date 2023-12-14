import nodeConfig from 'config';

export interface IConfig {
  server: {
    port: number,
  },
  auth: {
    secret: string,
  },
  rabbit: {
    user: string,
    password: string,
    host: string,
    port: number,
  }
}

export const config: IConfig = {
  server: nodeConfig.get('server'),
  auth: nodeConfig.get('auth'),
  rabbit: nodeConfig.get('rabbit'),
};
