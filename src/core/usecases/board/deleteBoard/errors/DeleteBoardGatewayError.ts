/* eslint-disable require-jsdoc */
import { UseCaseError } from '../../../../../core/definition';

class DeleteBoardGatewayError extends UseCaseError {
  constructor(msg: string) {
    super(msg);
  }
}

export default DeleteBoardGatewayError;
