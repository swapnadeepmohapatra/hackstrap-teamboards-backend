import { Result } from '../../../definition';
import { AddListGatewayError, AddListInvalidError } from './errors';

type AddListResponseDTO = Result<
  void,
  AddListGatewayError | AddListInvalidError
>;

export default AddListResponseDTO;
