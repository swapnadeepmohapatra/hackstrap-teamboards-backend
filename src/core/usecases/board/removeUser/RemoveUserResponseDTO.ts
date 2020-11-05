import { Result } from 'core/definition';
import { RemoveUserGatewayError, RemoveUserInvalidError } from './errors';

type RemoveUserResponseDTO = Result<
  void,
  RemoveUserGatewayError | RemoveUserInvalidError
>;

export default RemoveUserResponseDTO;
