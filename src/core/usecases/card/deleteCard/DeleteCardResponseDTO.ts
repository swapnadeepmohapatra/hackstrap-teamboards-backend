import { Result } from '../../../definition';
import { DeleteCardGatewayError, DeleteCardInvalidError } from './errors';

type DeleteCardResponseDTO = Result<
  void,
  DeleteCardGatewayError | DeleteCardInvalidError
>;

export default DeleteCardResponseDTO;
