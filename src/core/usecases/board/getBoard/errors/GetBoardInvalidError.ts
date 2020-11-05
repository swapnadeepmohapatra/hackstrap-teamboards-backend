import { UseCaseError } from 'core/definition';

class GetBoardInvalidError extends UseCaseError {
  constructor(obj: unknown) {
    super(`${JSON.stringify(obj)} is invalid`);
  }
}

export default GetBoardInvalidError;
