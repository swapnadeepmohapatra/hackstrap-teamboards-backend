/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable require-jsdoc */
import { Result, UseCase } from '../../../definition';
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

    const projectID = req.body.projectID;
    const projectTitle = req.body.projectTitle;

    const res = await this.projectEntityGateway.editProject(
      projectID,
      projectTitle,
    );

    if (res instanceof EditProjectGatewayError) return Result.fail(res);

    return Result.ok<undefined>(undefined);
  }
}

export default DeleteProjectUseCase;
