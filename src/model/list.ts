import { ObjectID } from "mongodb";

export interface AddList {
  title: String;
  cards?: String[];
  board: ObjectID;
}

export interface GetList {
  title: String;
  desc?: String;
  cards?: String[];
  author: String;
  members?: String[];
}
