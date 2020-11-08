/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable require-jsdoc */
import { Result, UseCase } from 'core/definition';
import { ICard } from 'core/entities';
import { ObjectID } from 'mongodb';
import CardEntityGateway from '../CardEntityGateway';
import AddCardRequestDTO from './AddCardRequestDTO';
import AddCardResponseDTO from './AddCardResponseDTO';
import { AddCardGatewayError, AddCardInvalidError } from './errors';

class AddCardUseCase implements UseCase<AddCardRequestDTO, AddCardResponseDTO> {
  constructor(private cardEntityGateway: CardEntityGateway) {}

  async execute(req: AddCardRequestDTO): Promise<AddCardResponseDTO> {
    if (!req.validate()) return Result.fail(new AddCardInvalidError(req));

    const payload: ICard = {
      text: req.body.text,
      list: new ObjectID(req.body.list),
    };

    const list: ObjectID = new ObjectID(req.body.list);

    const res = await this.cardEntityGateway.addCard(payload, list);

    if (res instanceof AddCardGatewayError) return Result.fail(res);

    return Result.ok<undefined>(undefined);
  }
}

export default AddCardUseCase;
