import { ICard } from '../../../core/entities';
import { ObjectID } from 'mongodb';
import { AddCardGatewayError } from './addCard';
import { DeleteCardGatewayError } from './deleteCard';

interface CardEntityGateway {
  addCard(card: ICard, listID: ObjectID): Promise<void | AddCardGatewayError>;
  deleteCard(
    cardID: string,
    listID: string,
  ): Promise<void | DeleteCardGatewayError>;
  editCardText(
    cardID: string,
    cardTitle: string,
  ): Promise<void | AddCardGatewayError>;
  editCardDate(
    cardID: string,
    dueDate: Date,
  ): Promise<void | AddCardGatewayError>;
  editCardPriority(
    cardID: string,
    priority: number,
  ): Promise<void | AddCardGatewayError>;
  dragCards(
    droppableIdStart: string,
    droppableIdEnd: string,
    droppableIndexEnd: number,
    droppableIndexStart: number,
  ): Promise<void | AddCardGatewayError>;
}

export default CardEntityGateway;
