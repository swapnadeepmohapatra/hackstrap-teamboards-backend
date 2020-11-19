/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable require-jsdoc */
import { Result, UseCase } from 'core/definition';
import CardEntityGateway from '../CardEntityGateway';
import EditCardPriorityRequestDTO from './EditCardPriorityRequestDTO';
import EditCardPriorityResponseDTO from './EditCardPriorityResponseDTO';
import {
  EditCardPriorityGatewayError,
  EditCardPriorityInvalidError,
} from './errors';

class EditCardPriorityUseCase
  implements UseCase<EditCardPriorityRequestDTO, EditCardPriorityResponseDTO> {
  constructor(private cardEntityGateway: CardEntityGateway) {}

  async execute(
    req: EditCardPriorityRequestDTO,
  ): Promise<EditCardPriorityResponseDTO> {
    if (!req.validate())
      return Result.fail(new EditCardPriorityInvalidError(req));

    const cardId: string = req.body.cardID;
    const cardPriority: number = req.body.priority;

    const res = await this.cardEntityGateway.editCardPriority(
      cardId,
      cardPriority,
    );

    if (res instanceof EditCardPriorityGatewayError) return Result.fail(res);

    return Result.ok<undefined>(undefined);
  }
}

export default EditCardPriorityUseCase;
