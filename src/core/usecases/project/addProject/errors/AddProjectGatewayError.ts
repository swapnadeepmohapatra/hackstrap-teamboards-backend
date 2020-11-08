/* eslint-disable require-jsdoc */
import { UseCaseError } from 'core/definition';

class AddProjectGatewayError extends UseCaseError {
  constructor(msg: string) {
    super(msg);
  }
}

export default AddProjectGatewayError;
