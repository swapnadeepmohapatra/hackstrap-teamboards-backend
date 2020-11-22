/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable require-jsdoc */
import { Result, UseCase } from '../../../definition';
import { IList } from '../../../entities';
import { ObjectID } from 'mongodb';
import ListEntityGateway from '../ListEntityGateway';
import AddListRequestDTO from './AddListRequestDTO';
import AddListResponseDTO from './AddListResponseDTO';
import { AddListGatewayError, AddListInvalidError } from './errors';

class AddListUseCase implements UseCase<AddListRequestDTO, AddListResponseDTO> {
  constructor(private listEntityGateway: ListEntityGateway) {}

  async execute(req: AddListRequestDTO): Promise<AddListResponseDTO> {
    if (!req.validate()) return Result.fail(new AddListInvalidError(req));

    const payload: IList = {
      title: req.body.title,
      cards: [],
      board: new ObjectID(req.body.board),
    };

    const board: ObjectID = new ObjectID(req.body.board);

    const res = await this.listEntityGateway.addList(payload, board);

    if (res instanceof AddListGatewayError) return Result.fail(res);

    return Result.ok<undefined>(undefined);
  }
}

export default AddListUseCase;
