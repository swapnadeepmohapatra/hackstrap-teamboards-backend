/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable require-jsdoc */
import { Result, UseCase } from 'core/definition';
import BoardEntityGateway from '../BoardEntityGateway';
import AddUserRequestDTO from './AddUserRequestDTO';
import AddUserResponseDTO from './AddUserResponseDTO';
import { AddUserGatewayError, AddUserInvalidError } from './errors';

class AddUserUseCase implements UseCase<AddUserRequestDTO, AddUserResponseDTO> {
  constructor(private boardEntityGateway: BoardEntityGateway) {}

  async execute(req: AddUserRequestDTO): Promise<AddUserResponseDTO> {
    if (!req.validate()) return Result.fail(new AddUserInvalidError(req));

    const boardID: string = req.body.boardID;
    const projectID: string = req.body.projectID;
    const currentUser: any = JSON.parse(req.user);

    const res = await this.boardEntityGateway.addUser(
      boardID,
      projectID,
      currentUser.id,
    );

    if (res instanceof AddUserGatewayError) return Result.fail(res);

    return Result.ok<undefined>(undefined);
  }
}

export default AddUserUseCase;
