import { ObjectID } from 'mongodb';

interface Board {
  title: string;
  desc?: string;
  author: string;
  lists?: ObjectID[];
  members: string[];
  project: ObjectID;
}

export default Board;
