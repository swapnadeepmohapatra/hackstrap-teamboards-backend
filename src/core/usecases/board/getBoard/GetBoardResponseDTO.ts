import { Result } from 'core/definition';
import Board from 'core/entities/Board';
import { GetBoardGatewayError } from './errors';

export interface BoardResponse {
  board: Board;
}

type GetBoardResponseDTO = Result<void | BoardResponse, GetBoardGatewayError>;

export default GetBoardResponseDTO;
