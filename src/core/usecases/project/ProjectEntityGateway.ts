import { IProject } from 'core/entities';
import { AddProjectGatewayError } from './addProject';
import { DeleteProjectGatewayError } from './deleteProject';
import { EditProjectGatewayError } from './editProject';
import { GetProjectGatewayError } from './getProject';
import { ProjectResponse } from './getProject/GetProjectResponseDTO';

interface ProjectEntityGateway {
  addProject(project: IProject): Promise<void | AddProjectGatewayError>;
  getProject(
    userID: string,
  ): Promise<void | ProjectResponse | GetProjectGatewayError>;
  deleteProject(projectID: string): Promise<void | DeleteProjectGatewayError>;
  editProject(
    projectID: string,
    projectTitle: string,
  ): Promise<void | EditProjectGatewayError>;
}

export default ProjectEntityGateway;
