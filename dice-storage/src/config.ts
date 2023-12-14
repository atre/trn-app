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
  rabbit: {
    user: string,
    password: string,
    host: string,
    port: number,
  }
}

export const config: IConfig = {
  server: nodeConfig.get('server'),
  db: nodeConfig.get('db'),
  rabbit: nodeConfig.get('rabbit'),
};
