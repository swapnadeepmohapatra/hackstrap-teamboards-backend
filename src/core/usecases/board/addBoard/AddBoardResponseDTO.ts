import { Result } from '../../../../core/definition';
import { AddBoardGatewayError, AddBoardInvalidError } from './errors';

type AddBoardResponseDTO = Result<
  void,
  AddBoardGatewayError | AddBoardInvalidError
>;

export default AddBoardResponseDTO;
