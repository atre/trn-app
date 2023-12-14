import { connect, Connection, Channel } from 'amqplib';
import { logger } from '../../util/logger';
import {config} from '../../config';

const { user, password, host, port } = config.rabbit;
export class RabbitConnect {
  private _connection!: Connection;

  private _channel!: Channel;

  private _url: string;

  public exchange: string;

  public queue: string;

  public pushQueue!: string;

  private _isConnected: boolean = false;

  constructor(nameExchange = 'rpc_exchange', url = `amqp://${user}:${password}@${host}:${port}`) {
    this._url = url;
    this.exchange = nameExchange;
    this.queue = `${this.exchange}_queue`;
  }

  async connect() {
    try {
      logger.info('Connecting to RabbitMQ');
      this._connection = await connect(this._url);
      this._channel = await this._connection.createChannel();
      await this.setupExchangeAndQueue();
      this.setupEventHandlers();
      this._isConnected = true;
      return this;
    } catch (error) {
      logger.error(error, 'Failed to connect to RabbitMQ');
      this._isConnected = false;
      throw error;
    }
  }

  private async setupExchangeAndQueue() {
    await this._channel.assertExchange(this.exchange, 'fanout', { durable: false });
    const q = await this._channel.assertQueue('', { exclusive: true, maxPriority: 10 });
    this.pushQueue = q.queue;
    await this._channel.assertQueue(this.queue, { durable: false, maxPriority: 10 });
    await this._channel.bindQueue(this.queue, this.exchange, '');
    await this._channel.prefetch(1);
  }

  private setupEventHandlers() {
    this._connection.on('close', logger.error);
    this._connection.on('error', logger.error);
  }

  async disconnect() {
    try {
      await this._channel.close();
      await this._connection.close();
      this._isConnected = false;
    } catch (error) {
      logger.error('Failed to disconnect from RabbitMQ', error);
      throw error;
    }
  }

  get channel() {
    return this._channel;
  }

  get connection() {
    return this._connection;
  }

  ack(message: any) {
    return this._channel.ack(message);
  }

  private async reconnect() {
    try {
      if (this._connection) {
        await this.disconnect();
      }
      await this.connect();
      logger.info('Reconnected to RabbitMQ');
    } catch (reconnectError) {
      logger.error('Reconnection failed', reconnectError);
      setTimeout(() => this.reconnect(), 5000);
    }
  }

  isConnected() {
    return this._isConnected;
  }
}
