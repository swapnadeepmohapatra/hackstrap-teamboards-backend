import { Result } from '../../core/definition';
import { GetProjectGatewayError } from './errors';

export interface ProjectResponse {
  projects: any[];
}

type GetProjectResponseDTO = Result<
  void | ProjectResponse,
  GetProjectGatewayError
>;

export default GetProjectResponseDTO;
