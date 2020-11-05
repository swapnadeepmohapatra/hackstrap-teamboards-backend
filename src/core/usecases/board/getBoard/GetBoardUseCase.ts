import { Result, UseCase } from 'core/definition';
import { GetBoardRequestDTO } from '.';
import BoardEntityGateway from '../BoardEntityGateway';
import { GetBoardGatewayError, GetBoardInvalidError } from './errors';
import GetBoardResponseDTO from './GetBoardResponseDTO';

class GetBoardUseCase
  implements UseCase<GetBoardRequestDTO, GetBoardResponseDTO> {
  constructor(private boardEntityGateway: BoardEntityGateway) {}

  async execute(req: GetBoardRequestDTO): Promise<GetBoardResponseDTO> {
    if (!req.validate()) return Result.fail(new GetBoardInvalidError(req));

    let boardID = req.body.boardID;

    const res = await this.boardEntityGateway.getBoard(boardID);

    if (res instanceof GetBoardGatewayError) return Result.fail(res);

    return Result.ok(res);
  }
}

export default GetBoardUseCase;
