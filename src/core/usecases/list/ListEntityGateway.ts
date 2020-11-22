import { IList } from '../../core/entities';
import { ObjectID } from 'mongodb';
import { AddListGatewayError } from './addList';
import { DeleteListGatewayError } from './deleteList';
import { EditListGatewayError } from './editList';
import { GetListGatewayError } from './getList';
import { ListResponse } from './getList/GetListResponseDTO';

interface ListEntityGateway {
  addList(list: IList, boardID: ObjectID): Promise<void | AddListGatewayError>;
  getList(listID: string): Promise<void | ListResponse | GetListGatewayError>;
  deleteList(
    listID: string,
    boardID: string,
  ): Promise<void | DeleteListGatewayError>;
  editList(
    listID: string,
    listTitle: string,
  ): Promise<void | EditListGatewayError>;
  dragList(
    boardID: string,
    droppableIndexStart: number,
    droppableIndexEnd: number,
  ): Promise<void | DeleteListGatewayError>;
}

export default ListEntityGateway;
