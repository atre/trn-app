import { Unauthorized } from 'http-errors';
import { UnauthorizedError } from '../unauthorized-error';
import { AbstractErrorSerializer } from './abstract-error.serializer';

export class UnauthorizedErrorSerializer extends AbstractErrorSerializer<UnauthorizedError> {
  canHandle(error: Error): boolean {
    return error instanceof UnauthorizedError;
  }

  protected serializeTypedError(error: UnauthorizedError) {
    return new Unauthorized(error.message);
  }
}
