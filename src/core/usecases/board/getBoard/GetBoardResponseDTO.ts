/* eslint-disable @typescript-eslint/ban-types */
import { Result } from 'core/definition';
import { GetBoardGatewayError } from './errors';

export interface BoardResponse {
  board: object;
}

type GetBoardResponseDTO = Result<void | BoardResponse, GetBoardGatewayError>;

export default GetBoardResponseDTO;
