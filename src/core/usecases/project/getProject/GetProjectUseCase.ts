import { Result, UseCase } from 'core/definition';
import { GetProjectRequestDTO } from '.';
import ProjectEntityGateway from '../ProjectEntityGateway';
import { GetProjectGatewayError, GetProjectInvalidError } from './errors';
import GetProjectResponseDTO from './GetProjectResponseDTO';

class GetProjectUseCase
  implements UseCase<GetProjectRequestDTO, GetProjectResponseDTO> {
  constructor(private projectEntityGateway: ProjectEntityGateway) {}

  async execute(req: GetProjectRequestDTO): Promise<GetProjectResponseDTO> {
    if (!req.validate()) return Result.fail(new GetProjectInvalidError(req));

    let currentUser: any = JSON.parse(req.user);

    const res = await this.projectEntityGateway.getProject(currentUser.id);

    if (res instanceof GetProjectGatewayError) return Result.fail(res);

    return Result.ok(res);
  }
}

export default GetProjectUseCase;
