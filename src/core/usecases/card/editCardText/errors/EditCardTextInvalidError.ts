import { UseCaseError } from 'core/definition';

class EditCardTextInvalidError extends UseCaseError {
  constructor(obj: unknown) {
    super(`${JSON.stringify(obj)} is invalid`);
  }
}

export default EditCardTextInvalidError;
