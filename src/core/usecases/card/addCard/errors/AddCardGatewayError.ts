/* eslint-disable require-jsdoc */
import { UseCaseError } from '../../../../../core/definition';

class AddCardGatewayError extends UseCaseError {
  constructor(msg: string) {
    super(msg);
  }
}

export default AddCardGatewayError;
