import { UseCaseError } from 'core/definition';

class AddUserGatewayError extends UseCaseError {
  constructor(msg: string) {
    super(msg);
  }
}

export default AddUserGatewayError;
