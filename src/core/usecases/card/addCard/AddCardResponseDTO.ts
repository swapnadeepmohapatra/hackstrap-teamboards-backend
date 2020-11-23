import { Result } from '../../../definition';
import { AddCardGatewayError, AddCardInvalidError } from './errors';

type AddCardResponseDTO = Result<
  void,
  AddCardGatewayError | AddCardInvalidError
>;

export default AddCardResponseDTO;
