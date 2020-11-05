import { Result, UseCase } from 'core/definition';
import { IList } from 'core/entities';
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
