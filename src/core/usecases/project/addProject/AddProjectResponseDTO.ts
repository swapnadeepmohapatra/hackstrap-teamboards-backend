import { Result } from '../../../definition';
import { AddProjectGatewayError, AddProjectInvalidError } from './errors';

type AddProjectResponseDTO = Result<
  void,
  AddProjectGatewayError | AddProjectInvalidError
>;

export default AddProjectResponseDTO;
