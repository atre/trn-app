import { IErrorSerializer } from '../serializers/abstract-error.serializer';
import { SchemaValidationErrorSerializer } from '../serializers/schema-validation-error.serializer';
import { ValidationErrorSerializer } from '../serializers/validation-error.serializer';

export class ErrorSerializerStrategy {
  constructor(private serializers: IErrorSerializer[]) {
  }

  serializeError(error: Error) {
    const serializer = this.serializers.find((s: IErrorSerializer) => s.canHandle(error));
    return serializer?.serializeError(error);
  }
}

export const errorSerializerStrategy = new ErrorSerializerStrategy([
  new ValidationErrorSerializer(),
  new SchemaValidationErrorSerializer(),
]);
