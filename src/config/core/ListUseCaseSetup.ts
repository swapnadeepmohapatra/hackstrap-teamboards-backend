import {
  AddListUseCase,
  ListEntityGateway,
  EditListUseCase,
  GetListUseCase,
  DeleteListUseCase,
  DragListUseCase,
} from 'core/usecases/List';

class ListUseCaseSetup {
  static addListUseCase(listEntityGateway: ListEntityGateway): AddListUseCase {
    return new AddListUseCase(listEntityGateway);
  }
  static getListUseCase(listEntityGateway: ListEntityGateway): GetListUseCase {
    return new GetListUseCase(listEntityGateway);
  }
  static editListUseCase(
    listEntityGateway: ListEntityGateway,
  ): EditListUseCase {
    return new EditListUseCase(listEntityGateway);
  }
  static deleteListUseCase(
    listEntityGateway: ListEntityGateway,
  ): DeleteListUseCase {
    return new DeleteListUseCase(listEntityGateway);
  }
  static dragListUseCase(
    listEntityGateway: ListEntityGateway,
  ): DragListUseCase {
    return new DragListUseCase(listEntityGateway);
  }
}

export default ListUseCaseSetup;
