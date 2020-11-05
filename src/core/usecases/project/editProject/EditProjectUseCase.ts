import { Result, UseCase } from 'core/definition';
import ProjectEntityGateway from '../ProjectEntityGateway';
import DeleteProjectRequestDTO from './EditProjectRequestDTO';
import DeleteProjectResponseDTO from './EditProjectResponseDTO';
import { EditProjectGatewayError, EditProjectInvalidError } from './errors';

class DeleteProjectUseCase
  implements UseCase<DeleteProjectRequestDTO, DeleteProjectResponseDTO> {
  constructor(private projectEntityGateway: ProjectEntityGateway) {}

  async execute(
    req: DeleteProjectRequestDTO,
  ): Promise<DeleteProjectResponseDTO> {
    if (!req.validate()) return Result.fail(new EditProjectInvalidError(req));

    let projectID = req.body.projectID;
    let projectTitle = req.body.projectTitle;

    const res = await this.projectEntityGateway.editProject(
      projectID,
      projectTitle,
    );

    if (res instanceof EditProjectGatewayError) return Result.fail(res);

    return Result.ok<undefined>(undefined);
  }
}

export default DeleteProjectUseCase;
