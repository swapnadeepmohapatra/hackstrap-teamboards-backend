import { UseCaseError } from 'core/definition';

class RemoveUserInvalidError extends UseCaseError {
  constructor(obj: unknown) {
    super(`${JSON.stringify(obj)} is invalid`);
  }
}

export default RemoveUserInvalidError;
