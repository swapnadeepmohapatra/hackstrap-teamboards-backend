/* eslint-disable require-jsdoc */
import { UseCaseError } from '../../../../../core/definition';

class AddProjectInvalidError extends UseCaseError {
  constructor(obj: unknown) {
    super(`${JSON.stringify(obj)} is invalid`);
  }
}

export default AddProjectInvalidError;
