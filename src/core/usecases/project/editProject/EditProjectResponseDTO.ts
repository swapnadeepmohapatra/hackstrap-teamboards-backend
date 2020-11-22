import { Result } from '../../core/definition';
import { EditProjectGatewayError, EditProjectInvalidError } from './errors';

type EditProjectResponseDTO = Result<
  void,
  EditProjectGatewayError | EditProjectInvalidError
>;

export default EditProjectResponseDTO;
