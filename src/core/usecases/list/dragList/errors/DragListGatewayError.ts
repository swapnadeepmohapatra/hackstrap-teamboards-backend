import { UseCaseError } from 'core/definition';

class DragListGatewayError extends UseCaseError {
  constructor(msg: string) {
    super(msg);
  }
}

export default DragListGatewayError;
