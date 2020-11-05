import { Result } from 'core/definition';
import { GetListGatewayError } from './errors';

export interface ListResponse {
  lists: any[];
}

type GetListResponseDTO = Result<void | ListResponse, GetListGatewayError>;

export default GetListResponseDTO;
