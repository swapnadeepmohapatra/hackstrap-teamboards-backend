import { Result, UseCase } from 'core/definition';
import ListEntityGateway from '../ListEntityGateway';
import GetListRequestDTO from './GetListRequestDTO';
import GetListResponseDTO from './GetListResponseDTO';
import { GetListGatewayError, GetListInvalidError } from './errors';

class GetListUseCase implements UseCase<GetListRequestDTO, GetListResponseDTO> {
  constructor(private listEntityGateway: ListEntityGateway) {}

  async execute(req: GetListRequestDTO): Promise<GetListResponseDTO> {
    if (!req.validate()) return Result.fail(new GetListInvalidError(req));

    let listID = req.body.listID;

    const res = await this.listEntityGateway.getList(listID);

    if (res instanceof GetListGatewayError) return Result.fail(res);

    return Result.ok(res);
  }
}

export default GetListUseCase;
