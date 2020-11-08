/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prefer-const */
/* eslint-disable one-var */
/* eslint-disable require-jsdoc */

import { DB_URL } from '../../config';
import { IBoard, IProject, IList, ICard } from 'core/entities';
import { MongoClient, ObjectID } from 'mongodb';
import {
  AddListGatewayError,
  DeleteListGatewayError,
  DragListGatewayError,
  EditListGatewayError,
  GetListGatewayError,
  ListEntityGateway,
} from 'core/usecases/list';
import { ListResponse } from 'core/usecases/list/getList/GetListResponseDTO';

export type collection = 'boards' | 'lists' | 'cards' | 'projects';

export type PermissionChangeAction = 'add' | 'remove';

export type InsertDoc = ICard | IProject | IList | IBoard;

export type InsertFilter = { [key: string]: any };

class ListDBEntityGateway implements ListEntityGateway {
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

  async addList(
    list: IList,
    projectID: ObjectID,
  ): Promise<void | AddListGatewayError> {
    let client = null,
      collection: collection = 'lists',
      parentCollection: collection = 'boards',
      doc = list,
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
      return new AddListGatewayError('Failed to add');
    }
  }

  async getList(
    listID: string,
  ): Promise<void | ListResponse | GetListGatewayError> {
    let res = null,
      client = null,
      collection: collection = 'lists';

    const aggregationQuery: any[] = [];

    aggregationQuery.push({ $match: { _id: new ObjectID(listID) } });
    aggregationQuery.push({
      $lookup: {
        from: 'cards',
        localField: '_id',
        foreignField: 'list',
        as: 'cards',
      },
    });

    try {
      client = await this.init();
      res = await this.query(collection, client)
        .aggregate(aggregationQuery)
        .toArray();

      await this.close(client, '[CLIENT CONNECTION CLOSED]');
      return { lists: res };
    } catch (error) {
      console.error(error);
      if (client) await this.close(client, '[CLIENT CONNECTION CLOSED]');
      return new GetListGatewayError('List not found');
    }
  }

  async editList(
    listID: string,
    listTitle: string,
  ): Promise<void | EditListGatewayError> {
    let client = null,
      collection: collection = 'lists',
      listId = listID;
    try {
      client = await this.init();
      await this.query(collection, client).findOneAndUpdate(
        { _id: new ObjectID(listId) },
        { $set: { title: listTitle } },
      );

      await this.close(client, '[CLIENT CONNECTION CLOSED]');
    } catch (error) {
      if (client) await this.close(client, '[CLIENT CONNECTION CLOSED]');
      return new EditListGatewayError('Failed to edit');
    }
  }

  async deleteList(
    listID: string,
    boardID: string,
  ): Promise<void | DeleteListGatewayError> {
    let client = null,
      collection: collection = 'lists',
      childID = listID,
      parentCollection: collection = 'boards',
      parentID = boardID;
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
      return new DeleteListGatewayError('Failed to delete');
    }
  }

  async dragList(
    boardID: string,
    droppableIndexStart: number,
    droppableIndexEnd: number,
  ): Promise<void | DragListGatewayError> {
    let client = null,
      res = null,
      _list = null,
      collection: collection = 'boards';

    try {
      client = await this.init();
      res = await this.query(collection, client).findOne({
        _id: new ObjectID(boardID),
      });

      _list = res.lists;

      if (_list) {
        const pulledOutList = _list.splice(droppableIndexStart, 1);
        _list.splice(droppableIndexEnd, 0, ...pulledOutList);
      }

      await this.query(collection, client).findOneAndUpdate(
        { _id: new ObjectID(boardID) },
        { $set: { lists: _list } },
      );

      await this.close(client, '[CLIENT CONNECTION CLOSED]');
    } catch (error) {
      console.error(error);
      if (client) await this.close(client, '[CLIENT CONNECTION CLOSED]');
      return new DragListGatewayError('Failed to delete');
    }
  }
}

export default ListDBEntityGateway;
