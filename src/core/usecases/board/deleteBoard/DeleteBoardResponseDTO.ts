import { Result } from 'core/definition';
import { DeleteBoardGatewayError, DeleteBoardInvalidError } from './errors';

type DeleteBoardResponseDTO = Result<
  void,
  DeleteBoardGatewayError | DeleteBoardInvalidError
>;

export default DeleteBoardResponseDTO;
