/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable require-jsdoc */
import { Result, UseCase } from 'core/definition';
import ListEntityGateway from '../ListEntityGateway';
import DeleteListRequestDTO from './EditListRequestDTO';
import DeleteListResponseDTO from './EditListResponseDTO';
import { EditListGatewayError, EditListInvalidError } from './errors';

class EditListUseCase
  implements UseCase<DeleteListRequestDTO, DeleteListResponseDTO> {
  constructor(private listEntityGateway: ListEntityGateway) {}

  async execute(req: DeleteListRequestDTO): Promise<DeleteListResponseDTO> {
    if (!req.validate()) return Result.fail(new EditListInvalidError(req));

    let listID = req.body.listID;
    let listTitle = req.body.listTitle;

    const res = await this.listEntityGateway.editList(listID, listTitle);

    if (res instanceof EditListGatewayError) return Result.fail(res);

    return Result.ok<undefined>(undefined);
  }
}

export default EditListUseCase;
