import { Result, UseCase } from 'core/definition';
import ProjectEntityGateway from '../ProjectEntityGateway';
import DeleteProjectRequestDTO from './DeleteProjectRequestDTO';
import DeleteProjectResponseDTO from './DeleteProjectResponseDTO';
import { DeleteProjectGatewayError, DeleteProjectInvalidError } from './errors';

class DeleteProjectUseCase
  implements UseCase<DeleteProjectRequestDTO, DeleteProjectResponseDTO> {
  constructor(private projectEntityGateway: ProjectEntityGateway) {}

  async execute(
    req: DeleteProjectRequestDTO,
  ): Promise<DeleteProjectResponseDTO> {
    if (!req.validate()) return Result.fail(new DeleteProjectInvalidError(req));

    let projectID = req.body.projectID;

    const res = await this.projectEntityGateway.deleteProject(projectID);

    if (res instanceof DeleteProjectGatewayError) return Result.fail(res);

    return Result.ok<undefined>(undefined);
  }
}

export default DeleteProjectUseCase;
