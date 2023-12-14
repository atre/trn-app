import { Message } from 'amqplib';
import { logger } from '../../util/logger';
import { RabbitConnect } from './connect';
import { RabbitRPCRequest } from './rpc-request';
import { IDiceRequest } from './interface';
import { IPlayResponse } from '../../schema/play';

export class RabbitService {
  private static instance: RabbitService;

  private connection: RabbitConnect;

  public requestSequence: Map<string | null, { complete: (msg: string) => void }>;

  private constructor() {
    this.connection = new RabbitConnect();
    this.connection.connect();
    this.requestSequence = new Map<string, { complete:(msg: string) => void }>();
  }

  public static async getInstance(): Promise<RabbitService> {
    if (!RabbitService.instance) {
      RabbitService.instance = new RabbitService();
    }
    if (!RabbitService.instance.connection.isConnected()) {
      await RabbitService.instance.connection.connect();
    }
    return RabbitService.instance;
  }

  private messageHandler(message: Message | null) {
    const currentHandler = this.requestSequence.get(message!.properties.correlationId);
    if (currentHandler) {
      currentHandler.complete(message!.content.toString());
      const deleteId = this.requestSequence.delete(message!.properties.correlationId);
      logger.info(`${deleteId}`);
      this.connection.ack(message);
    }
  }

  async init() {
    logger.info(`Listen channel ${this.connection.pushQueue}`);
    this.connection.channel.consume(this.connection.pushQueue, this.messageHandler.bind(this));
  }

  async disconnect() {
    logger.info('Closing RabbitMQ connection');
    try {
      await this.connection.disconnect();
    } catch (error) {
      logger.error('Error closing RabbitMQ connection', error);
    }
  }

  private timeoutHandler(
    request: RabbitRPCRequest,
    reject: (reason: string) => void,
    timeout: number = 6000,
  ) {
    return setTimeout(() => {
      request.destroy();
      reject('TIMEOUT ERROR');
    }, timeout);
  }

  async getDiceResult(request: IDiceRequest): Promise<IPlayResponse> {
    const newRequest = new RabbitRPCRequest(request);
    this.requestSequence.set(newRequest.id!, { complete: newRequest.complete.bind(newRequest) });

    await newRequest.publish(this.connection);

    return new Promise((resolve, reject) => {
      this.timeoutHandler(newRequest, reject);

      newRequest.on('complete', resolve);
    });
  }
}
