/* eslint-disable require-jsdoc */
import { UseCaseError } from 'core/definition';

class EditCardPriorityGatewayError extends UseCaseError {
  constructor(msg: string) {
    super(msg);
  }
}

export default EditCardPriorityGatewayError;
