/* eslint-disable require-jsdoc */
import { UseCaseError } from '../../../../../core/definition';

class RemoveUserGatewayError extends UseCaseError {
  constructor(msg: string) {
    super(msg);
  }
}

export default RemoveUserGatewayError;
