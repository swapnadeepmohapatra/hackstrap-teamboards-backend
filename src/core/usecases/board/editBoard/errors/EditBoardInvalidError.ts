import { UseCaseError } from 'core/definition';

class EditBoardInvalidError extends UseCaseError {
  constructor(obj: unknown) {
    super(`${JSON.stringify(obj)} is invalid`);
  }
}

export default EditBoardInvalidError;
