/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable require-jsdoc */
import { Result, UseCase } from '../../../definition';
import BoardEntityGateway from '../BoardEntityGateway';
import RemoveUserRequestDTO from './RemoveUserRequestDTO';
import RemoveUserResponseDTO from './RemoveUserResponseDTO';
import { RemoveUserGatewayError, RemoveUserInvalidError } from './errors';

class RemoveUserUseCase
  implements UseCase<RemoveUserRequestDTO, RemoveUserResponseDTO> {
  constructor(private boardEntityGateway: BoardEntityGateway) {}

  async execute(req: RemoveUserRequestDTO): Promise<RemoveUserResponseDTO> {
    if (!req.validate()) return Result.fail(new RemoveUserInvalidError(req));

    const boardID = req.body.boardID;
    const projectID = req.body.projectID;
    const currentUser: any = JSON.parse(req.user);

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
