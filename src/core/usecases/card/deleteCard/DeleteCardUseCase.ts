/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable require-jsdoc */
import { Result, UseCase } from '../../../../core/definition';
import CardEntityGateway from '../CardEntityGateway';
import DeleteCardRequestDTO from './DeleteCardRequestDTO';
import DeleteCardResponseDTO from './DeleteCardResponseDTO';
import { DeleteCardGatewayError, DeleteCardInvalidError } from './errors';

class DeleteCardUseCase
  implements UseCase<DeleteCardRequestDTO, DeleteCardResponseDTO> {
  constructor(private cardEntityGateway: CardEntityGateway) {}

  async execute(req: DeleteCardRequestDTO): Promise<DeleteCardResponseDTO> {
    if (!req.validate()) return Result.fail(new DeleteCardInvalidError(req));

    const cardId: string = req.body.cardID;
    const listId: string = req.body.listID;

    const res = await this.cardEntityGateway.deleteCard(cardId, listId);

    if (res instanceof DeleteCardGatewayError) return Result.fail(res);

    return Result.ok<undefined>(undefined);
  }
}

export default DeleteCardUseCase;
