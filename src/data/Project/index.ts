/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prefer-const */
/* eslint-disable one-var */
/* eslint-disable require-jsdoc */

import { DB_URL } from '../../config';
import { IProject, IBoard, IList, ICard } from 'core/entities';
import { MongoClient, ObjectID } from 'mongodb';
import {
  AddProjectGatewayError,
  DeleteProjectGatewayError,
  EditProjectGatewayError,
  GetProjectGatewayError,
  ProjectEntityGateway,
} from 'core/usecases/project';
import { ProjectResponse } from 'core/usecases/project/getProject/GetProjectResponseDTO';

export type Collection = 'boards' | 'lists' | 'cards' | 'projects';

export type PermissionChangeAction = 'add' | 'remove';

export type InsertDoc = IProject | IBoard | IList | ICard;

export type InsertFilter = { [key: string]: any };

class ProjectDBEntityGateway implements ProjectEntityGateway {
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

  async addProject(project: IProject): Promise<void | AddProjectGatewayError> {
    let client = null,
      collection = 'projects',
      doc = project;

    try {
      client = await this.init();
      await this.query(collection, client).insertOne(doc);

      await this.close(client, '[CLIENT CONNECTION CLOSED]');
    } catch (error) {
      if (client) await this.close(client, '[CLIENT CONNECTION CLOSED]');
      return new AddProjectGatewayError('Failed to add');
    }
  }

  async getProject(
    userID: string,
  ): Promise<void | ProjectResponse | GetProjectGatewayError> {
    let userId = userID,
      res = null,
      client = null;

    const aggregationQuery: any[] = [];

    aggregationQuery.push({ $match: { members: userId } });
    aggregationQuery.push({
      $lookup: {
        from: 'boards',
        localField: '_id',
        foreignField: 'project',
        as: 'boards',
      },
    });

    try {
      client = await this.init();
      res = await this.query('projects', client)
        .aggregate(aggregationQuery)
        .toArray();

      await this.close(client, '[CLIENT CONNECTION CLOSED]');
      return { projects: res };
    } catch (error) {
      console.error(error);
      if (client) await this.close(client, '[CLIENT CONNECTION CLOSED]');
      return new GetProjectGatewayError('Project not found');
    }
  }

  async deleteProject(
    projectID: string,
  ): Promise<void | DeleteProjectGatewayError> {
    let client = null,
      collection = 'projects',
      projectId = projectID;
    try {
      client = await this.init();
      await this.query(collection, client).deleteOne({
        _id: new ObjectID(projectId),
      });

      await this.close(client, '[CLIENT CONNECTION CLOSED]');
    } catch (error) {
      if (client) await this.close(client, '[CLIENT CONNECTION CLOSED]');
      return new DeleteProjectGatewayError('Failed to delete');
    }
  }

  async editProject(
    projectID: string,
    projectTitle: string,
  ): Promise<void | EditProjectGatewayError> {
    let client = null,
      collection = 'projects',
      projectId = projectID;
    try {
      client = await this.init();
      await this.query(collection, client).findOneAndUpdate(
        { _id: new ObjectID(projectId) },
        { $set: { title: projectTitle } },
      );

      await this.close(client, '[CLIENT CONNECTION CLOSED]');
    } catch (error) {
      if (client) await this.close(client, '[CLIENT CONNECTION CLOSED]');
      return new EditProjectGatewayError('Failed to delete');
    }
  }
}

export default ProjectDBEntityGateway;
