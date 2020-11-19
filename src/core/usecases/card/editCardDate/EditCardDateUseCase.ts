/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable require-jsdoc */
import { Result, UseCase } from 'core/definition';
import CardEntityGateway from '../CardEntityGateway';
import EditCardDateRequestDTO from './EditCardDateRequestDTO';
import EditCardDateResponseDTO from './EditCardDateResponseDTO';
import { EditCardDateGatewayError, EditCardDateInvalidError } from './errors';

class EditCardDateUseCase
  implements UseCase<EditCardDateRequestDTO, EditCardDateResponseDTO> {
  constructor(private cardEntityGateway: CardEntityGateway) {}

  async execute(req: EditCardDateRequestDTO): Promise<EditCardDateResponseDTO> {
    if (!req.validate()) return Result.fail(new EditCardDateInvalidError(req));

    const cardId: string = req.body.cardID;
    const dueDate: Date = req.body.dueDate;

    const res = await this.cardEntityGateway.editCardDate(cardId, dueDate);

    if (res instanceof EditCardDateGatewayError) return Result.fail(res);

    return Result.ok<undefined>(undefined);
  }
}

export default EditCardDateUseCase;
