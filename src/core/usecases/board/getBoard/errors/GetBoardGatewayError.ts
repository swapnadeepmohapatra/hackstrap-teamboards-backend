/* eslint-disable require-jsdoc */
import { UseCaseError } from 'core/definition';

class GetBoardGatewayError extends UseCaseError {
  constructor(msg: string) {
    super(msg);
  }
}

export default GetBoardGatewayError;
