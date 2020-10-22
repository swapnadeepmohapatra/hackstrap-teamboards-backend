import { ObjectID } from "mongodb";

export interface GetBoard {
  _id: String;
  title: String;
  desc?: String;
  author: String;
  list?: String[];
  members: String[];
  project: ObjectID;
}

export interface AddBoard {
  title: String;
  desc?: String;
  author: String;
  list?: String[];
  members: String[];
  project: ObjectID;
}
