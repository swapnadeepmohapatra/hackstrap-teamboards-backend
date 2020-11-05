import { DB_URL } from '../../config';
import { IBoard, IProject, IList, ICard } from 'core/entities';
import { MongoClient, ObjectID } from 'mongodb';
import {
  BoardEntityGateway,
  DeleteBoardGatewayError,
  EditBoardGatewayError,
  GetBoardGatewayError,
  AddBoardGatewayError,
} from 'core/usecases/board';
import { BoardResponse } from 'core/usecases/board/getBoard/GetBoardResponseDTO';

export type Collection = 'boards' | 'lists' | 'cards' | 'projects';

export type PermissionChangeAction = 'add' | 'remove';

export type InsertDoc = IBoard | IProject | IList | ICard;

export type InsertFilter = { [key: string]: any };

class BoardDBEntityGateway implements BoardEntityGateway {
  private readonly _uri = DB_URL;
  private readonly _DATABASE = 'hackstrap';
  private get _mongoClient() {
    return new MongoClient(this._uri, { useUnifiedTopology: true });
  }
  private async init() {
    return this._mongoClient.connect();
  }
  private query(collection: string, client: MongoClient) {
    return client.db(this._DATABASE).collection(collection);
  }
  private async close(client: MongoClient, ...message: Array<any>) {
    await client.close();
    console.log(...message);
  }

  async addBoard(
    Board: IBoard,
    projectID: ObjectID,
  ): Promise<void | AddBoardGatewayError> {
    let client = null,
      collection = 'boards',
      parentCollection = 'projects',
      doc = Board,
      parentInsertFilter = {
        _id: new ObjectID(projectID),
      },
      res = null;

    try {
      client = await this.init();
      res = await this.query(collection, client).insertOne(doc);

      await this.query(parentCollection, client).findOneAndUpdate(
        parentInsertFilter,
        {
          $push: { [collection]: new ObjectID(res.insertedId) },
        },
      );

      await this.close(client, '[CLIENT CONNECTION CLOSED]');
    } catch (error) {
      if (client) await this.close(client, '[CLIENT CONNECTION CLOSED]');
      return new AddBoardGatewayError('Failed to add');
    }
  }

  async getBoard(
    boardID: string,
  ): Promise<void | BoardResponse | GetBoardGatewayError> {
    let boardId = boardID,
      res = null,
      collection = 'boards',
      client = null;

    try {
      client = await this.init();
      res = await this.query(collection, client)
        .find({ _id: new ObjectID(boardId) })
        .toArray();
      await this.close(client, '[CLIENT CONNECTION CLOSED]');
      return {
        board: res[0],
      };
    } catch (error) {
      console.error(error);
      if (client) await this.close(client, '[CLIENT CONNECTION CLOSED]');
      return new GetBoardGatewayError('Board not found');
    }
  }

  async deleteBoard(
    boardID: string,
    projectID: string,
  ): Promise<void | DeleteBoardGatewayError> {
    let client = null,
      collection = 'boards',
      childID = boardID,
      parentCollection = 'projects',
      parentID = projectID;
    try {
      client = await this.init();
      await this.query(collection, client).deleteOne({
        _id: new ObjectID(childID),
      });

      await this.query(parentCollection, client).findOneAndUpdate(
        { _id: new ObjectID(parentID) },
        {
          $pull: { [collection]: new ObjectID(childID) },
        },
      );

      await this.close(client, '[CLIENT CONNECTION CLOSED]');
    } catch (error) {
      if (client) await this.close(client, '[CLIENT CONNECTION CLOSED]');
      return new DeleteBoardGatewayError('Failed to delete');
    }
  }

  async editBoard(
    boardID: string,
    boardTitle: string,
  ): Promise<void | EditBoardGatewayError> {
    let client = null,
      collection = 'boards',
      boardId = boardID;
    try {
      client = await this.init();
      await this.query(collection, client).findOneAndUpdate(
        { _id: new ObjectID(boardId) },
        { $set: { title: boardTitle } },
      );

      await this.close(client, '[CLIENT CONNECTION CLOSED]');
    } catch (error) {
      if (client) await this.close(client, '[CLIENT CONNECTION CLOSED]');
      return new EditBoardGatewayError('Failed to edit');
    }
  }

  async addUser(
    boardID: string,
    projectID: string,
    userID: string,
  ): Promise<void | EditBoardGatewayError> {
    let client = null,
      filter = { $push: { members: userID } };
    try {
      client = await this.init();
      await this.query('boards', client).findOneAndUpdate(
        { _id: new ObjectID(boardID) },
        filter,
      );

      await this.query('projects', client).findOneAndUpdate(
        { _id: new ObjectID(projectID) },
        filter,
      );

      await this.close(client, '[CLIENT CONNECTION CLOSED]');
    } catch (error) {
      if (client) await this.close(client, '[CLIENT CONNECTION CLOSED]');
      return new EditBoardGatewayError('Failed to add user');
    }
  }

  async removeUser(
    boardID: string,
    projectID: string,
    userID: string,
  ): Promise<void | EditBoardGatewayError> {
    let client = null,
      filter = { $pull: { members: userID } };
    try {
      client = await this.init();
      await this.query('boards', client).findOneAndUpdate(
        { _id: new ObjectID(boardID) },
        filter,
      );

      await this.query('projects', client).findOneAndUpdate(
        { _id: new ObjectID(projectID) },
        filter,
      );

      await this.close(client, '[CLIENT CONNECTION CLOSED]');
    } catch (error) {
      if (client) await this.close(client, '[CLIENT CONNECTION CLOSED]');
      return new EditBoardGatewayError('Failed to remoce user');
    }
  }
}

export default BoardDBEntityGateway;
