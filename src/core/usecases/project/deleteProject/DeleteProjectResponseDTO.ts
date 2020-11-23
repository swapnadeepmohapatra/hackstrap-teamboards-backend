import { Result } from '../../../definition';
import { DeleteProjectGatewayError, DeleteProjectInvalidError } from './errors';

type DeleteProjectResponseDTO = Result<
  void,
  DeleteProjectGatewayError | DeleteProjectInvalidError
>;

export default DeleteProjectResponseDTO;
