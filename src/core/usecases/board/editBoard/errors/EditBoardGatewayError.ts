import { UseCaseError } from 'core/definition';

class EditBoardGatewayError extends UseCaseError {
  constructor(msg: string) {
    super(msg);
  }
}

export default EditBoardGatewayError;
