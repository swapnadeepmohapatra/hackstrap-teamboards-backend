import { Result } from '../../../definition';
import {
  EditCardPriorityGatewayError,
  EditCardPriorityInvalidError,
} from './errors';

type EditCardPriorityResponseDTO = Result<
  void,
  EditCardPriorityGatewayError | EditCardPriorityInvalidError
>;

export default EditCardPriorityResponseDTO;
