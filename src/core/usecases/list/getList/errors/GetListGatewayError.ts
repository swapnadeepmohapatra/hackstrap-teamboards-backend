/* eslint-disable require-jsdoc */
import { UseCaseError } from '../../../../../core/definition';

class GetListGatewayError extends UseCaseError {
  constructor(msg: string) {
    super(msg);
  }
}

export default GetListGatewayError;
