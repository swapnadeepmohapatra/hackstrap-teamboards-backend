/* eslint-disable require-jsdoc */
import { UseCaseError } from '../../../../../core/definition';

class EditListGatewayError extends UseCaseError {
  constructor(msg: string) {
    super(msg);
  }
}

export default EditListGatewayError;
