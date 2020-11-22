/* eslint-disable require-jsdoc */
import { UseCaseError } from '../../../../../core/definition';

class DeleteProjectGatewayError extends UseCaseError {
  constructor(msg: string) {
    super(msg);
  }
}

export default DeleteProjectGatewayError;
