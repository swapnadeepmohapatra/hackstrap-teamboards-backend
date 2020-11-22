import { Result } from '../../core/definition';
import { DeleteListGatewayError, DeleteListInvalidError } from './errors';

type DeleteListResponseDTO = Result<
  void,
  DeleteListGatewayError | DeleteListInvalidError
>;

export default DeleteListResponseDTO;
