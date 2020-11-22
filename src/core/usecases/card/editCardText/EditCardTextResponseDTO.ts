import { Result } from '../../core/definition';
import { EditCardTextGatewayError, EditCardTextInvalidError } from './errors';

type EditCardTextResponseDTO = Result<
  void,
  EditCardTextGatewayError | EditCardTextInvalidError
>;

export default EditCardTextResponseDTO;
