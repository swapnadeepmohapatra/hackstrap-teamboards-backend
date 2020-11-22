/* eslint-disable require-jsdoc */
import { UseCaseError } from '../../../../../core/definition';

class EditCardTextGatewayError extends UseCaseError {
  constructor(msg: string) {
    super(msg);
  }
}

export default EditCardTextGatewayError;
