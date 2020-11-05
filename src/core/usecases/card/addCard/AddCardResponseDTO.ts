import { Result } from 'core/definition';
import { AddCardGatewayError, AddCardInvalidError } from './errors';

type AddCardResponseDTO = Result<
  void,
  AddCardGatewayError | AddCardInvalidError
>;

export default AddCardResponseDTO;
