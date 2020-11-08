/* eslint-disable require-jsdoc */
import { UseCaseError } from 'core/definition';

class AddBoardGatewayError extends UseCaseError {
  constructor(msg: string) {
    super(msg);
  }
}

export default AddBoardGatewayError;
