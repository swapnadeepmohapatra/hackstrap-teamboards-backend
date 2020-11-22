import { Result } from '../../core/definition';
import { DeleteProjectGatewayError, DeleteProjectInvalidError } from './errors';

type DeleteProjectResponseDTO = Result<
  void,
  DeleteProjectGatewayError | DeleteProjectInvalidError
>;

export default DeleteProjectResponseDTO;
