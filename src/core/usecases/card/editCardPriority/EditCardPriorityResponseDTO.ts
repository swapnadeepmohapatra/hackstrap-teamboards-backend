import { Result } from 'core/definition';
import {
  EditCardPriorityGatewayError,
  EditCardPriorityInvalidError,
} from './errors';

type EditCardPriorityResponseDTO = Result<
  void,
  EditCardPriorityGatewayError | EditCardPriorityInvalidError
>;

export default EditCardPriorityResponseDTO;
