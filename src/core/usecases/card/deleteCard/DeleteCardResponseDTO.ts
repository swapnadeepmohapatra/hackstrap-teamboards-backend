import { Result } from 'core/definition';
import { DeleteCardGatewayError, DeleteCardInvalidError } from './errors';

type DeleteCardResponseDTO = Result<
  void,
  DeleteCardGatewayError | DeleteCardInvalidError
>;

export default DeleteCardResponseDTO;
