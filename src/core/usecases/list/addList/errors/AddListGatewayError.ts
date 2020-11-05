import { UseCaseError } from 'core/definition';

class AddListGatewayError extends UseCaseError {
  constructor(msg: string) {
    super(msg);
  }
}

export default AddListGatewayError;
