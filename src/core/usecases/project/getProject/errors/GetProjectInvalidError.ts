/* eslint-disable require-jsdoc */
import { UseCaseError } from '../../../../../core/definition';

class GetProjectInvalidError extends UseCaseError {
  constructor(obj: unknown) {
    super(`${JSON.stringify(obj)} is invalid`);
  }
}

export default GetProjectInvalidError;
