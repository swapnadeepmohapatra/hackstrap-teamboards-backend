import { Result } from '../../../definition';
import { DragCardGatewayError, DragCardInvalidError } from './errors';

type DragCardResponseDTO = Result<
  void,
  DragCardGatewayError | DragCardInvalidError
>;

export default DragCardResponseDTO;
