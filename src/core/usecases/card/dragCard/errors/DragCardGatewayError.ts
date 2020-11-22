/* eslint-disable require-jsdoc */
import { UseCaseError } from '../../../../../core/definition';

class DragCardGatewayError extends UseCaseError {
  constructor(msg: string) {
    super(msg);
  }
}

export default DragCardGatewayError;
