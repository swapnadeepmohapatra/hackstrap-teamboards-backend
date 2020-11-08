/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable require-jsdoc */
import { Result, UseCase } from 'core/definition';
import BoardEntityGateway from '../BoardEntityGateway';
import RemoveUserRequestDTO from './RemoveUserRequestDTO';
import RemoveUserResponseDTO from './RemoveUserResponseDTO';
import { RemoveUserGatewayError, RemoveUserInvalidError } from './errors';

class RemoveUserUseCase
  implements UseCase<RemoveUserRequestDTO, RemoveUserResponseDTO> {
  constructor(private boardEntityGateway: BoardEntityGateway) {}

  async execute(req: RemoveUserRequestDTO): Promise<RemoveUserResponseDTO> {
    if (!req.validate()) return Result.fail(new RemoveUserInvalidError(req));

    let boardID = req.body.boardID;
    let projectID = req.body.projectID;
    let currentUser: any = JSON.parse(req.user);

    const res = await this.boardEntityGateway.removeUser(
      boardID,
      projectID,
      currentUser.id,
    );

    if (res instanceof RemoveUserGatewayError) return Result.fail(res);

    return Result.ok<undefined>(undefined);
  }
}

export default RemoveUserUseCase;
