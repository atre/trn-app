import nodeConfig from 'config';

export interface IConfig {
  server: {
    port: number,
  },
  db: {
    host: string,
    port: number,
    user: string,
    password: string,
    db: string,
  },
  auth: {
    secret: string,
  }
}

export const config: IConfig = {
  server: nodeConfig.get('server'),
  db: nodeConfig.get('db'),
  auth: nodeConfig.get('auth'),
};
