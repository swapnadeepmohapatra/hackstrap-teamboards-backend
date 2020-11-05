import {
  AddProjectUseCase,
  DeleteProjectUseCase,
  EditProjectUseCase,
  GetProjectUseCase,
  ProjectEntityGateway,
} from 'core/usecases/project';

class ProjectUseCaseSetup {
  static addProjectUseCase(
    projectEntityGateway: ProjectEntityGateway,
  ): AddProjectUseCase {
    return new AddProjectUseCase(projectEntityGateway);
  }

  static getProjectUseCase(
    projectEntityGateway: ProjectEntityGateway,
  ): GetProjectUseCase {
    return new GetProjectUseCase(projectEntityGateway);
  }

  static deleteProjectUseCase(
    projectEntityGateway: ProjectEntityGateway,
  ): DeleteProjectUseCase {
    return new DeleteProjectUseCase(projectEntityGateway);
  }

  static editProjectUseCase(
    projectEntityGateway: ProjectEntityGateway,
  ): EditProjectUseCase {
    return new EditProjectUseCase(projectEntityGateway);
  }
}

export default ProjectUseCaseSetup;
