import { UseCaseError } from 'core/definition';

class AddListInvalidError extends UseCaseError {
  constructor(obj: unknown) {
    super(`${JSON.stringify(obj)} is invalid`);
  }
}

export default AddListInvalidError;
