/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable require-jsdoc */
import { Result, UseCase } from 'core/definition';
import BoardEntityGateway from '../BoardEntityGateway';
import DeleteBoardRequestDTO from './EditBoardRequestDTO';
import DeleteBoardResponseDTO from './EditBoardResponseDTO';
import { EditBoardGatewayError, EditBoardInvalidError } from './errors';

class EditBoardUseCase
  implements UseCase<DeleteBoardRequestDTO, DeleteBoardResponseDTO> {
  constructor(private boardEntityGateway: BoardEntityGateway) {}

  async execute(req: DeleteBoardRequestDTO): Promise<DeleteBoardResponseDTO> {
    if (!req.validate()) return Result.fail(new EditBoardInvalidError(req));

    let boardID = req.body.BoardID;
    let boardTitle = req.body.BoardTitle;

    const res = await this.boardEntityGateway.editBoard(boardID, boardTitle);

    if (res instanceof EditBoardGatewayError) return Result.fail(res);

    return Result.ok<undefined>(undefined);
  }
}

export default EditBoardUseCase;
