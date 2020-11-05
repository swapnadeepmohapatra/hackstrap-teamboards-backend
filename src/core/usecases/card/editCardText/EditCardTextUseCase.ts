import { Result, UseCase } from 'core/definition';
import CardEntityGateway from '../CardEntityGateway';
import EditCardTextRequestDTO from './EditCardTextRequestDTO';
import EditCardTextResponseDTO from './EditCardTextResponseDTO';
import { EditCardTextGatewayError, EditCardTextInvalidError } from './errors';

class EditCardTextUseCase
  implements UseCase<EditCardTextRequestDTO, EditCardTextResponseDTO> {
  constructor(private cardEntityGateway: CardEntityGateway) {}

  async execute(req: EditCardTextRequestDTO): Promise<EditCardTextResponseDTO> {
    if (!req.validate()) return Result.fail(new EditCardTextInvalidError(req));

    const cardId: string = req.body.cardID;
    const cardText: string = req.body.cardText;

    const res = await this.cardEntityGateway.editCardText(cardId, cardText);

    if (res instanceof EditCardTextGatewayError) return Result.fail(res);

    return Result.ok<undefined>(undefined);
  }
}

export default EditCardTextUseCase;
