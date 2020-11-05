import { UseCaseError } from 'core/definition';

class AddBoardInvalidError extends UseCaseError {
  constructor(obj: unknown) {
    super(`${JSON.stringify(obj)} is invalid`);
  }
}

export default AddBoardInvalidError;
