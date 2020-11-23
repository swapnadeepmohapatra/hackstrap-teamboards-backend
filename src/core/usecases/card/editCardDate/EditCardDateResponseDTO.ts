import { Result } from '../../../definition';
import { EditCardDateGatewayError, EditCardDateInvalidError } from './errors';

type EditCardDateResponseDTO = Result<
  void,
  EditCardDateGatewayError | EditCardDateInvalidError
>;

export default EditCardDateResponseDTO;
