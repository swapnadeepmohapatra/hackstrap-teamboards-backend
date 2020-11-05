import { IBoard } from 'core/entities';
import { ObjectID } from 'mongodb';
import { AddBoardGatewayError } from './addBoard';
import { AddUserGatewayError } from './addUser';
import { DeleteBoardGatewayError } from './deleteBoard';
import { EditBoardGatewayError } from './editBoard';
import { GetBoardGatewayError } from './getBoard';
import { BoardResponse } from './getBoard/GetBoardResponseDTO';
import { RemoveUserGatewayError } from './removeUser';

interface BoardEntityGateway {
  addBoard(
    Board: IBoard,
    projectID: ObjectID,
  ): Promise<void | AddBoardGatewayError>;
  getBoard(
    boardID: string,
  ): Promise<void | BoardResponse | GetBoardGatewayError>;
  deleteBoard(
    boardID: string,
    projectID: string,
  ): Promise<void | DeleteBoardGatewayError>;
  editBoard(
    BoardID: string,
    BoardTitle: string,
  ): Promise<void | EditBoardGatewayError>;
  removeUser(
    boardID: string,
    projectID: string,
    userID: string,
  ): Promise<void | RemoveUserGatewayError>;
  addUser(
    boardID: string,
    projectID: string,
    userID: string,
  ): Promise<void | AddUserGatewayError>;
}

export default BoardEntityGateway;
