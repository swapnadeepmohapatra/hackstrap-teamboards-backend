import { Result } from '../../../definition';
import Board from '../../../entities/Board';
import { GetBoardGatewayError } from './errors';

export interface BoardResponse {
  board: Board;
}

type GetBoardResponseDTO = Result<void | BoardResponse, GetBoardGatewayError>;

export default GetBoardResponseDTO;
