import { ObjectId } from "mongodb";

export interface AddCard {
  text: String;
  list: ObjectId;
}

export interface GetCard {
  id: String;
  text: String;
  list: ObjectId;
  dueDate?: Date;
  priority?: Number;
}
