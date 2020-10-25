import { MongoClient, ObjectID, ObjectId } from "mongodb";
import keys from "../config/keys";
import { AddBoard } from "../model/board";
import { AddCard } from "../model/card";
import { AddList } from "../model/list";
import { AddProject } from "../model/project";

// ========================================= INTERFACES ============================================

export type Collection = "boards" | "lists" | "cards" | "projects";

export type InsertDoc = AddProject | AddBoard | AddList | AddCard;

export type InsertFilter = { [key: string]: any };

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

  // ========================================= INSERT ============================================
  /**
   * @description This function inserts new doccuemnt.
   * @param { Collection } collection - The collection where the data needs to be inserted.
   * @param { InsertDoc } doc - The doccuemnt that is to be inserted.
   * @param { Collection } parentCollection - The parent collection under which the inserted ID will be saved.
   * @param { InsertFilter } parentInsertFilter - The filter to search for the parent doccuemnt in the parent collection.
   *
   */
  async insert(
    collection: Collection,
    doc: InsertDoc,
    parentCollection?: Collection,
    parentInsertFilter?: InsertFilter
  ) {
    let client = null,
      res = null;
    try {
      client = await this.init();
      res = await this.query(collection, client).insertOne(doc);

      if (parentCollection && parentInsertFilter) {
        await this.query(parentCollection, client).findOneAndUpdate(
          parentInsertFilter,
          {
            $push: { [collection]: new ObjectId(res.insertedId) },
          }
        );
      }

      await this.close(client, "[CLIENT CONNECTION CLOSED]");

      return {
        result: "Added",
      };
    } catch (error) {
      if (client) await this.close(client, "[CLIENT CONNECTION CLOSED]");
      throw error;
    }
  }

  // ========================================= DELETE ============================================
  /**
   * @description This function deletes doccuemnt.
   * @param { Collection } collection - The collection from where the data needs to be deleted.
   * @param { string } childID - The ID of the doccuemnt that is to be deleted.
   * @param { Collection } parentCollection - The parent collection from where the data needs to be deleted.
   * @param { string } parentID - The ID of the parent doccuemnt that is to be deleted.
   *
   */
  async delete(
    collection: Collection,
    childID: string,
    parentCollection?: Collection,
    parentID?: string
  ) {
    let client = null,
      res = null;
    try {
      client = await this.init();
      res = await this.query(collection, client).deleteOne({
        _id: new ObjectID(childID),
      });

      if (parentCollection && parentID) {
        await this.query(parentCollection, client).findOneAndUpdate(
          { _id: new ObjectId(parentID) },
          {
            $pull: { [collection]: new ObjectId(childID) },
          }
        );
      }

      await this.close(client, "[CLIENT CONNECTION CLOSED]");

      return {
        result: "Deleted",
      };
    } catch (error) {
      if (client) await this.close(client, "[CLIENT CONNECTION CLOSED]");
      throw error;
    }
  }

  // ========================================= PROJECT ============================================
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
  //   Get Boards

  // async getBoards(collection: Collection, projectId: string) {
  //   let res = null,
  //     client = null;

  //   const aggregationQuery: any[] = [];

  //   aggregationQuery.push({ $match: { project: new ObjectId(projectId) } });
  //   aggregationQuery.push({
  //     $lookup: {
  //       from: "lists",
  //       pipeline: [],
  //       as: "lists",
  //     },
  //   });

  //   try {
  //     client = await this.init();
  //     res = await this.query(collection, client)
  //       .aggregate(aggregationQuery)
  //       // .find({ project: new ObjectId(projectId) })
  //       .toArray();
  //     await this.close(client, "[CLIENT CONNECTION CLOSED]");
  //     return {
  //       boards: res,
  //     };
  //   } catch (error) {
  //     console.error(error);
  //     if (client) await this.close(client, "[CLIENT CONNECTION CLOSED]");
  //     throw error;
  //   }
  async getBoards(collection: Collection, boardID: string) {
    let res = null,
      client = null;

    try {
      client = await this.init();
      res = await this.query(collection, client)
        .find({ _id: new ObjectId(boardID) })
        .toArray();
      await this.close(client, "[CLIENT CONNECTION CLOSED]");
      return {
        board: res[0],
      };
    } catch (error) {
      console.error(error);
      if (client) await this.close(client, "[CLIENT CONNECTION CLOSED]");
      throw error;
    }
  }

  //   Add User To Board
  async addUserToBoard(boardID: string, projectID: string, userID: string) {
    let client = null;

    try {
      client = await this.init();
      await this.query("boards", client).findOneAndUpdate(
        { _id: new ObjectId(boardID) },
        { $push: { members: userID } }
      );

      await this.query("projects", client).findOneAndUpdate(
        { _id: new ObjectId(projectID) },
        { $push: { members: userID } }
      );

      await this.close(client, "[CLIENT CONNECTION CLOSED]");
      return {
        message: "Added User",
      };
    } catch (error) {
      console.error(error);
      if (client) await this.close(client, "[CLIENT CONNECTION CLOSED]");
      throw error;
    }
  }

  //   Deleted User From Board
  async deleteUserFromBoard(
    boardID: string,
    projectID: string,
    userID: string
  ) {
    let client = null;

    try {
      client = await this.init();
      await this.query("boards", client).findOneAndUpdate(
        { _id: new ObjectId(boardID) },
        { $pull: { members: userID } }
      );

      await this.query("projects", client).findOneAndUpdate(
        { _id: new ObjectId(projectID) },
        { $pull: { members: userID } }
      );

      await this.close(client, "[CLIENT CONNECTION CLOSED]");
      return {
        message: "Removed User",
      };
    } catch (error) {
      console.error(error);
      if (client) await this.close(client, "[CLIENT CONNECTION CLOSED]");
      throw error;
    }
  }

  // ========================================= LISTS ============================================
  //   Get Lists

  async getLists(collection: Collection, listID: string) {
    let res = null,
      client = null;

    const aggregationQuery: any[] = [];

    aggregationQuery.push({ $match: { _id: new ObjectID(listID) } });
    aggregationQuery.push({
      $lookup: {
        from: "cards",
        pipeline: [],
        as: "cards",
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
        lists: res[0],
      };
    } catch (error) {
      console.error(error);
      if (client) await this.close(client, "[CLIENT CONNECTION CLOSED]");
      throw error;
    }
  }

  //   Edit List Title
  async editListTitle(
    collection: Collection,
    listID: string,
    listTitle: string
  ) {
    let client = null;

    try {
      client = await this.init();
      await this.query(collection, client).findOneAndUpdate(
        { _id: new ObjectId(listID) },
        { $set: { title: listTitle } }
      );
      await this.close(client, "[CLIENT CONNECTION CLOSED]");
      return {
        message: "List Edited",
      };
    } catch (error) {
      console.error(error);
      if (client) await this.close(client, "[CLIENT CONNECTION CLOSED]");
      throw error;
    }
  }

  // ========================================= CARDS ============================================

  async editCardText(collection: Collection, cardID: string, cardText: string) {
    let client = null;

    try {
      client = await this.init();
      await this.query(collection, client).findOneAndUpdate(
        { _id: new ObjectId(cardID) },
        { $set: { text: cardText } }
      );
      await this.close(client, "[CLIENT CONNECTION CLOSED]");
      return {
        message: "Card Edited",
      };
    } catch (error) {
      console.error(error);
      if (client) await this.close(client, "[CLIENT CONNECTION CLOSED]");
      throw error;
    }
  }

  async editCardDate(collection: Collection, cardID: string, dueDate: Date) {
    let client = null;

    try {
      client = await this.init();
      await this.query(collection, client).findOneAndUpdate(
        { _id: new ObjectId(cardID) },
        { $set: { dueDate: new Date(dueDate) } }
      );
      await this.close(client, "[CLIENT CONNECTION CLOSED]");
      return {
        message: "Card Edited",
      };
    } catch (error) {
      console.error(error);
      if (client) await this.close(client, "[CLIENT CONNECTION CLOSED]");
      throw error;
    }
  }

  async editCardPriority(
    collection: Collection,
    cardID: string,
    priority: Number
  ) {
    let client = null;

    try {
      client = await this.init();
      await this.query(collection, client).findOneAndUpdate(
        { _id: new ObjectId(cardID) },
        { $set: { priority: priority } }
      );
      await this.close(client, "[CLIENT CONNECTION CLOSED]");
      return {
        message: "Card Edited",
      };
    } catch (error) {
      console.error(error);
      if (client) await this.close(client, "[CLIENT CONNECTION CLOSED]");
      throw error;
    }
  }
}
