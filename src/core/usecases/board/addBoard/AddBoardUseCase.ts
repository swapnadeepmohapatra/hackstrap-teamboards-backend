/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable require-jsdoc */
import { Result, UseCase } from '../../../definition';
import { IBoard } from '../../../entities';
import { ObjectID } from 'mongodb';
import BoardEntityGateway from '../BoardEntityGateway';
import AddBoardRequestDTO from './AddBoardRequestDTO';
import AddBoardResponseDTO from './AddBoardResponseDTO';
import { AddBoardGatewayError, AddBoardInvalidError } from './errors';

class AddBoardUseCase
  implements UseCase<AddBoardRequestDTO, AddBoardResponseDTO> {
  constructor(private boardEntityGateway: BoardEntityGateway) {}

  async execute(req: AddBoardRequestDTO): Promise<AddBoardResponseDTO> {
    if (!req.validate()) return Result.fail(new AddBoardInvalidError(req));

    const currentUser: any = JSON.parse(req.user);

    const payload: IBoard = {
      title: req.body.title,
      desc: '',
      author: currentUser.id,
      lists: [],
      members: [currentUser.id],
      project: new ObjectID(req.body.project),
    };

    const project: ObjectID = new ObjectID(req.body.project);

    const res = await this.boardEntityGateway.addBoard(payload, project);

    if (res instanceof AddBoardGatewayError) return Result.fail(res);

    return Result.ok<undefined>(undefined);
  }
}

export default AddBoardUseCase;
