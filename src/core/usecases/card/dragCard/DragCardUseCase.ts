/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable require-jsdoc */
import { Result, UseCase } from 'core/definition';
import CardEntityGateway from '../CardEntityGateway';
import DeleteCardRequestDTO from './DragCardRequestDTO';
import DeleteCardResponseDTO from './DragCardResponseDTO';
import { DragCardGatewayError, DragCardInvalidError } from './errors';

class DragCardUseCase
  implements UseCase<DeleteCardRequestDTO, DeleteCardResponseDTO> {
  constructor(private cardEntityGateway: CardEntityGateway) {}

  async execute(req: DeleteCardRequestDTO): Promise<DeleteCardResponseDTO> {
    if (!req.validate()) return Result.fail(new DragCardInvalidError(req));

    const droppableIdStart: string = req.body.droppableIdStart;
    const droppableIdEnd: string = req.body.droppableIdEnd;
    const droppableIndexEnd: number = req.body.droppableIndexEnd;
    const droppableIndexStart: number = req.body.droppableIndexStart;

    const res = await this.cardEntityGateway.dragCards(
      droppableIdStart,
      droppableIdEnd,
      droppableIndexStart,
      droppableIndexEnd,
    );

    if (res instanceof DragCardGatewayError) return Result.fail(res);

    return Result.ok<undefined>(undefined);
  }
}

export default DragCardUseCase;
