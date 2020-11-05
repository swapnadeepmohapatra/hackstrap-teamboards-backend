import { ObjectID } from 'mongodb';

interface List {
  title: string;
  board: ObjectID;
  cards?: string[];
}

export default List;
