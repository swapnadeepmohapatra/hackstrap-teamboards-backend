import { Result } from 'core/definition';
import { EditListGatewayError, EditListInvalidError } from './errors';

type EditListResponseDTO = Result<
  void,
  EditListGatewayError | EditListInvalidError
>;

export default EditListResponseDTO;
