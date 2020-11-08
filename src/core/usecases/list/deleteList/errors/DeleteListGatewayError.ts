/* eslint-disable require-jsdoc */
import { UseCaseError } from 'core/definition';

class DeleteListGatewayError extends UseCaseError {
  constructor(msg: string) {
    super(msg);
  }
}

export default DeleteListGatewayError;
