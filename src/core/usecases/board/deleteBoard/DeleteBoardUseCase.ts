/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable require-jsdoc */
import { Result, UseCase } from 'core/definition';
import BoardEntityGateway from '../BoardEntityGateway';
import DeleteBoardRequestDTO from './DeleteBoardRequestDTO';
import DeleteBoardResponseDTO from './DeleteBoardResponseDTO';
import { DeleteBoardGatewayError, DeleteBoardInvalidError } from './errors';

class DeleteBoardUseCase
  implements UseCase<DeleteBoardRequestDTO, DeleteBoardResponseDTO> {
  constructor(private boardEntityGateway: BoardEntityGateway) {}

  async execute(req: DeleteBoardRequestDTO): Promise<DeleteBoardResponseDTO> {
    if (!req.validate()) return Result.fail(new DeleteBoardInvalidError(req));

    let boardID = req.body.boardID;
    let projectID = req.body.projectID;

    const res = await this.boardEntityGateway.deleteBoard(boardID, projectID);

    if (res instanceof DeleteBoardGatewayError) return Result.fail(res);

    return Result.ok<undefined>(undefined);
  }
}

export default DeleteBoardUseCase;
