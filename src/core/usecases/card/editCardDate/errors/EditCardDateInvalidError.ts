import { UseCaseError } from 'core/definition';

class EditCardDateInvalidError extends UseCaseError {
  constructor(obj: unknown) {
    super(`${JSON.stringify(obj)} is invalid`);
  }
}

export default EditCardDateInvalidError;
