/* eslint-disable require-jsdoc */
import { UseCaseError } from 'core/definition';

class EditProjectGatewayError extends UseCaseError {
  constructor(msg: string) {
    super(msg);
  }
}

export default EditProjectGatewayError;
