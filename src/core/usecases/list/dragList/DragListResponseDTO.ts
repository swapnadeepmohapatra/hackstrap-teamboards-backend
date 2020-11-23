import { Result } from '../../../../core/definition';
import { DragListGatewayError, DragListInvalidError } from './errors';

type DragListResponseDTO = Result<
  void,
  DragListGatewayError | DragListInvalidError
>;

export default DragListResponseDTO;
