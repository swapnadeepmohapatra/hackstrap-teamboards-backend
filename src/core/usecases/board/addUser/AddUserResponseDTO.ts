import { Result } from '../../../../core/definition';
import { AddUserGatewayError, AddUserInvalidError } from './errors';

type AddUserResponseDTO = Result<
  void,
  AddUserGatewayError | AddUserInvalidError
>;

export default AddUserResponseDTO;
