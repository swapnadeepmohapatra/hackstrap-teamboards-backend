import { MongoClient, ObjectID, ObjectId } from "mongodb";
import keys from "../config/keys";
import { AddBoard } from "../model/board";
import { AddCard } from "../model/card";
import { AddProject } from "../model/project";

// ========================================= INTERFACES ============================================

export type Collection = "boards" | "lists" | "cards" | "projects";

export type UpsertFilter = { [key: string]: any };

// ========================================= CLASS ============================================

export class DB {
  private readonly _uri = keys.mongoLocal;
  private readonly _DATABASE = "hackstrap";

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

  // ========================================= PROJECT ============================================
  //   Insert Project

  async insertProject(collection: Collection, doc: AddProject) {
    let client = null;
    const upsertFilter = doc;
    try {
      client = await this.init();
      await this.query(collection, client).insertOne(upsertFilter);
      await this.close(client, "[CLIENT CONNECTION CLOSED]");

      return {
        result: "Project Added",
      };
    } catch (error) {
      if (client) await this.close(client, "[CLIENT CONNECTION CLOSED]");
      throw error;
    }
  }

  //   Get Projects

  async getProjects(collection: Collection, userId: string) {
    let res = null,
      client = null;

    const aggregationQuery: any[] = [];

    aggregationQuery.push({ $match: { members: userId } });
    aggregationQuery.push({
      $lookup: {
        from: "boards",
        pipeline: [],
        as: "boards",
      },
    });

    try {
      client = await this.init();
      res = await this.query(collection, client)
        .aggregate(aggregationQuery)
        // .find({ members: userId })
        .toArray();
      await this.close(client, "[CLIENT CONNECTION CLOSED]");
      return {
        projects: res,
      };
    } catch (error) {
      console.error(error);
      if (client) await this.close(client, "[CLIENT CONNECTION CLOSED]");
      throw error;
    }
  }

  //   Delete Project

  async deleteProject(collection: Collection, projectID: string) {
    let client = null;

    try {
      client = await this.init();
      await this.query(collection, client).deleteOne({
        _id: new ObjectId(projectID),
      });
      await this.close(client, "[CLIENT CONNECTION CLOSED]");
      return {
        message: "Project Deleted",
      };
    } catch (error) {
      console.error(error);
      if (client) await this.close(client, "[CLIENT CONNECTION CLOSED]");
      throw error;
    }
  }

  //   Edit Project

  async editProject(
    collection: Collection,
    projectID: string,
    projectTitle: string
  ) {
    let client = null;

    try {
      client = await this.init();
      await this.query(collection, client).findOneAndUpdate(
        { _id: new ObjectID(projectID) },
        { $set: { title: projectTitle } }
      );
      await this.close(client, "[CLIENT CONNECTION CLOSED]");
      return {
        message: "Project Edited",
      };
    } catch (error) {
      console.error(error);
      if (client) await this.close(client, "[CLIENT CONNECTION CLOSED]");
      throw error;
    }
  }

  // ========================================= BOARDS ============================================
  // Insert Board

  async insertBoard(
    collection: Collection,
    doc: AddBoard,
    parentDoc?: Collection
  ) {
    let client = null,
      res = null;
    const upsertFilter = doc;
    try {
      client = await this.init();
      res = await this.query(collection, client).insertOne(upsertFilter);

      if (parentDoc) {
        await this.query(parentDoc, client).findOneAndUpdate(
          {
            _id: upsertFilter.project,
          },
          { $push: { [collection]: new ObjectId(res.insertedId) } }
        );
      }

      await this.close(client, "[CLIENT CONNECTION CLOSED]");

      return {
        result: "Board Added",
      };
    } catch (error) {
      if (client) await this.close(client, "[CLIENT CONNECTION CLOSED]");
      throw error;
    }
  }

  //   Insert Card

  async inserCard(
    collection: Collection,
    doc: AddCard,
    parentDoc?: Collection
  ) {
    let res = null,
      client = null;

    const upsertFilter = doc;
    try {
      client = await this.init();
      res = await this.query(collection, client).insertOne(upsertFilter);
      if (parentDoc) {
        await this.query(parentDoc, client).findOneAndUpdate(
          {
            _id: upsertFilter.list,
          },
          { $push: { [collection]: new ObjectId(res.insertedId) } }
        );
      }

      await this.close(client, "[CLIENT CONNECTION CLOSED]");

      return {
        result: "Card Added",
      };
    } catch (error) {
      if (client) await this.close(client, "[CLIENT CONNECTION CLOSED]");
      throw error;
    }
  }
}
