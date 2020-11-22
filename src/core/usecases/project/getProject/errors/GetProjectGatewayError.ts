/* eslint-disable require-jsdoc */
import { UseCaseError } from '../../../../../core/definition';

class GetProjectGatewayError extends UseCaseError {
  constructor(msg: string) {
    super(msg);
  }
}

export default GetProjectGatewayError;
