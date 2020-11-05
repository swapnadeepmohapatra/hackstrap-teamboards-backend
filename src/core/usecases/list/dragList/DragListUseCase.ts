import { Result, UseCase } from 'core/definition';
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
