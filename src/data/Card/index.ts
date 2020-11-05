import { DB_URL } from '../../config';
import { IBoard, IProject, IList, ICard } from 'core/entities';
import { MongoClient, ObjectID } from 'mongodb';
import {
  CardEntityGateway,
  DeleteCardGatewayError,
  AddCardGatewayError,
} from 'core/usecases/Card';

export type Collection = 'boards' | 'lists' | 'cards' | 'projects';

export type PermissionChangeAction = 'add' | 'remove';

export type InsertDoc = ICard | IProject | IList | IBoard;

export type InsertFilter = { [key: string]: any };

class CardDBEntityGateway implements CardEntityGateway {
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

  async addCard(
    card: ICard,
    listID: ObjectID,
  ): Promise<void | AddCardGatewayError> {
    let client = null,
      collection: Collection = 'cards',
      parentCollection: Collection = 'lists',
      doc: InsertDoc = card,
      parentInsertFilter = {
        _id: new ObjectID(listID),
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
      return new AddCardGatewayError('Failed to add');
    }
  }

  async editCardDate(
    cardID: string,
    dueDate: Date,
  ): Promise<void | AddCardGatewayError> {
    let client = null,
      collection: Collection = 'cards';

    try {
      client = await this.init();

      await this.query(collection, client).findOneAndUpdate(
        { _id: new ObjectID(cardID) },
        { $set: { dueDate: new Date(dueDate) } },
      );

      await this.close(client, '[CLIENT CONNECTION CLOSED]');
    } catch (error) {
      if (client) await this.close(client, '[CLIENT CONNECTION CLOSED]');
      return new AddCardGatewayError('Failed to edit');
    }
  }

  async editCardPriority(
    cardID: string,
    priority: number,
  ): Promise<void | AddCardGatewayError> {
    let client = null,
      collection: Collection = 'cards';

    try {
      client = await this.init();

      await this.query(collection, client).findOneAndUpdate(
        { _id: new ObjectID(cardID) },
        { $set: { priority: priority } },
      );

      await this.close(client, '[CLIENT CONNECTION CLOSED]');
    } catch (error) {
      if (client) await this.close(client, '[CLIENT CONNECTION CLOSED]');
      return new AddCardGatewayError('Failed to edit');
    }
  }

  async editCardText(
    cardID: string,
    cardText: string,
  ): Promise<void | AddCardGatewayError> {
    let client = null,
      collection: Collection = 'cards';

    try {
      client = await this.init();

      await this.query(collection, client).findOneAndUpdate(
        { _id: new ObjectID(cardID) },
        { $set: { text: cardText } },
      );

      await this.close(client, '[CLIENT CONNECTION CLOSED]');
    } catch (error) {
      if (client) await this.close(client, '[CLIENT CONNECTION CLOSED]');
      return new AddCardGatewayError('Failed to edit');
    }
  }

  async deleteCard(
    cardID: string,
    listID: string,
  ): Promise<void | DeleteCardGatewayError> {
    let client = null,
      collection: Collection = 'lists',
      childID = cardID,
      parentCollection: Collection = 'boards',
      parentID = listID;
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
      return new DeleteCardGatewayError('Failed to delete');
    }
  }

  async dragCards(
    droppableIdStart: string,
    droppableIdEnd: string,
    droppableIndexEnd: number,
    droppableIndexStart: number,
  ): Promise<void | AddCardGatewayError> {
    let client = null,
      res = null,
      _cards = null,
      collection: Collection = 'cards';

    try {
      client = await this.init();

      if (droppableIdStart === droppableIdEnd) {
        res = await this.query(collection, client).findOne({
          _id: new ObjectID(droppableIdStart),
        });

        _cards = res.cards;

        if (_cards) {
          const pulledOutCards = _cards.splice(droppableIndexStart, 1);
          _cards.splice(droppableIndexEnd, 0, ...pulledOutCards);
        }

        await this.query(collection, client).findOneAndUpdate(
          { _id: new ObjectID(droppableIdEnd) },
          { $set: { cards: _cards } },
        );
      } else {
        let _cards1 = null,
          _cards2 = null;

        res = await this.query(collection, client).findOne({
          _id: new ObjectID(droppableIdStart),
        });

        _cards1 = res.cards;

        res = await this.query(collection, client).findOne({
          _id: new ObjectID(droppableIdEnd),
        });

        _cards2 = res.cards;

        const pulledOutCardsStart = _cards1.splice(droppableIndexStart, 1);
        _cards2.splice(droppableIndexEnd, 0, ...pulledOutCardsStart);

        await this.query(collection, client).findOneAndUpdate(
          { _id: new ObjectID(droppableIdStart) },
          { $set: { cards: _cards1 } },
        );

        await this.query(collection, client).findOneAndUpdate(
          { _id: new ObjectID(droppableIdEnd) },
          { $set: { cards: _cards2 } },
        );
      }

      await this.close(client, '[CLIENT CONNECTION CLOSED]');
    } catch (error) {
      if (client) await this.close(client, '[CLIENT CONNECTION CLOSED]');
      return new AddCardGatewayError('Failed to edit');
    }
  }
}

export default CardDBEntityGateway;
