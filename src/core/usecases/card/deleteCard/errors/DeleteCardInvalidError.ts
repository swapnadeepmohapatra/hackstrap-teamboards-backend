import { UseCaseError } from 'core/definition';

class DeleteCardInvalidError extends UseCaseError {
  constructor(obj: unknown) {
    super(`${JSON.stringify(obj)} is invalid`);
  }
}

export default DeleteCardInvalidError;
