/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable require-jsdoc */
import { Result, UseCase } from 'core/definition';
import ListEntityGateway from '../ListEntityGateway';
import DeleteListRequestDTO from './DeleteListRequestDTO';
import DeleteListResponseDTO from './DeleteListResponseDTO';
import { DeleteListGatewayError, DeleteListInvalidError } from './errors';

class DeleteListUseCase
  implements UseCase<DeleteListRequestDTO, DeleteListResponseDTO> {
  constructor(private listEntityGateway: ListEntityGateway) {}

  async execute(req: DeleteListRequestDTO): Promise<DeleteListResponseDTO> {
    if (!req.validate()) return Result.fail(new DeleteListInvalidError(req));

    let listID = req.body.listID;
    let boardID = req.body.boardID;

    const res = await this.listEntityGateway.deleteList(listID, boardID);

    if (res instanceof DeleteListGatewayError) return Result.fail(res);

    return Result.ok<undefined>(undefined);
  }
}

export default DeleteListUseCase;
