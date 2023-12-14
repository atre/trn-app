import nodeConfig from 'config';

export interface IConfig {
  server: {
    port: number,
  },
  redis: {
    host: string,
    port: number,
    db: number,
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
  redis: nodeConfig.get('redis'),
  rabbit: nodeConfig.get('rabbit'),
};
