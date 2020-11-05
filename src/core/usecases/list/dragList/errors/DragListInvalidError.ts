import { UseCaseError } from 'core/definition';

class DragListInvalidError extends UseCaseError {
  constructor(obj: unknown) {
    super(`${JSON.stringify(obj)} is invalid`);
  }
}

export default DragListInvalidError;
