import { Conflict } from 'http-errors';
import { ConflictError } from '../conflict-error';
import { AbstractErrorSerializer } from './abstract-error.serializer';

export class ConflictErrorSerializer extends AbstractErrorSerializer<ConflictError> {
  canHandle(error: Error): boolean {
    return error instanceof ConflictError;
  }

  protected serializeTypedError(error: ConflictError) {
    return new Conflict(error.message);
  }
}
