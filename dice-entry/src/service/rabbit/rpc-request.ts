import { EventEmitter } from 'events';
import { RabbitConnect } from './connect';
import { logger } from '../../util/logger';
import { IDiceRequest } from './interface';

export class RabbitRPCRequest extends EventEmitter {
  private _id?: string;

  constructor(private request: IDiceRequest) {
    super();
    this._id = request.id;
    this.on('error', this._errorHandler.bind(this));
  }

  get id() {
    return this._id;
  }

  public complete(message: string) {
    logger.info(`[RPC Request Complete] Received message: ${message}`);
    const result = JSON.parse(message);
    this.emit('complete', result);
    this.destroy();
    return result;
  }

  public destroy() {
    logger.debug('[RPC Request Destroy] Clearing resources');
    this.removeAllListeners();
    this._id = undefined;
  }

  private _errorHandler(error: any) {
    logger.error('[RPC Request Error] Error occurred in emitter', error);
  }

  async publish(connection: RabbitConnect) {
    const { channel } = connection;
    const message = JSON.stringify({ ...this.request, id: this._id });
    channel.publish(connection.exchange, '', Buffer.from(message), {
      correlationId: this._id,
      replyTo: connection.pushQueue,
    });
    logger.info(`[RPC Publish] Published message to ${connection.pushQueue} | Message: ${message}`);
  }
}
