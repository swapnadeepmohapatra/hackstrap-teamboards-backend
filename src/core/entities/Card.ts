import { ObjectId } from 'mongodb';

interface Card {
  text: string;
  list: ObjectId;
  dueDate?: Date;
  priority?: number;
}

export default Card;
