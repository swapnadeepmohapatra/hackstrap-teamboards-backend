/* eslint-disable require-jsdoc */
import { UseCaseError } from 'core/definition';

class EditCardDateGatewayError extends UseCaseError {
  constructor(msg: string) {
    super(msg);
  }
}

export default EditCardDateGatewayError;
