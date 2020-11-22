/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable require-jsdoc */
import { Result, UseCase } from '../../../definition';
import ListEntityGateway from '../ListEntityGateway';
import DeleteListRequestDTO from './DragListRequestDTO';
import DeleteListResponseDTO from './DragListResponseDTO';
import { DragListGatewayError, DragListInvalidError } from './errors';

class DragListUseCase
  implements UseCase<DeleteListRequestDTO, DeleteListResponseDTO> {
  constructor(private listEntityGateway: ListEntityGateway) {}

  async execute(req: DeleteListRequestDTO): Promise<DeleteListResponseDTO> {
    if (!req.validate()) return Result.fail(new DragListInvalidError(req));

    const boardID: string = req.body.boardID;
    const droppableIndexStart: number = req.body.droppableIndexStart;
    const droppableIndexEnd: number = req.body.droppableIndexEnd;

    const res = await this.listEntityGateway.dragList(
      boardID,
      droppableIndexStart,
      droppableIndexEnd,
    );

    if (res instanceof DragListGatewayError) return Result.fail(res);

    return Result.ok<undefined>(undefined);
  }
}

export default DragListUseCase;
