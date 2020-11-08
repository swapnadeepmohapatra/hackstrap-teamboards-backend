/* eslint-disable require-jsdoc */
import { UseCaseError } from 'core/definition';

class DeleteCardGatewayError extends UseCaseError {
  constructor(msg: string) {
    super(msg);
  }
}

export default DeleteCardGatewayError;
