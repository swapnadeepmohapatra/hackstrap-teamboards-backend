/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable require-jsdoc */
import { Result, UseCase } from 'core/definition';
import { IProject } from 'core/entities';
import ProjectEntityGateway from '../ProjectEntityGateway';
import AddProjectRequestDTO from './AddProjectRequestDTO';
import AddProjectResponseDTO from './AddProjectResponseDTO';
import { AddProjectGatewayError, AddProjectInvalidError } from './errors';

class AddProjectUseCase
  implements UseCase<AddProjectRequestDTO, AddProjectResponseDTO> {
  constructor(private projectEntityGateway: ProjectEntityGateway) {}

  async execute(req: AddProjectRequestDTO): Promise<AddProjectResponseDTO> {
    if (!req.validate()) return Result.fail(new AddProjectInvalidError(req));

    const currentUser: any = JSON.parse(req.user);

    const payload: IProject = {
      title: req.body.title,
      desc: req.body.desc,
      boards: [],
      author: currentUser.id,
      members: [currentUser.id],
    };

    const res = await this.projectEntityGateway.addProject(payload);

    if (res instanceof AddProjectGatewayError) return Result.fail(res);

    return Result.ok<undefined>(undefined);
  }
}

export default AddProjectUseCase;
