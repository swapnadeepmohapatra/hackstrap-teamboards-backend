import { Result } from '../../../definition';
import { EditBoardGatewayError, EditBoardInvalidError } from './errors';

type EditBoardResponseDTO = Result<
  void,
  EditBoardGatewayError | EditBoardInvalidError
>;

export default EditBoardResponseDTO;
