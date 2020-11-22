import { Result } from '../../core/definition';
import { AddListGatewayError, AddListInvalidError } from './errors';

type AddListResponseDTO = Result<
  void,
  AddListGatewayError | AddListInvalidError
>;

export default AddListResponseDTO;
