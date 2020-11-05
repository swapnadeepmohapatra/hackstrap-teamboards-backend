import {
  AddBoardController,
  AddProjectController,
  DeleteBoardController,
  DeleteProjectController,
  EditProjectController,
  GetBoardController,
  GetProjectController,
  BoardRouter,
  ProjectRouter,
  RemoveUserController,
  AddUserController,
  ListRouter,
  CardRouter,
  AddCardController,
  AddListController,
  GetListController,
  EditListController,
  DeleteListController,
  DragListController,
  DeleteCardController,
  EditCardTextController,
  EditCardDateController,
  EditCardPriorityController,
  DragCardController,
} from 'entrypoint/web';

class RouterSetup {
  static getProjectRouter(
    addProjectController: AddProjectController,
    getProjectController: GetProjectController,
    deleteProjectController: DeleteProjectController,
    editProjectController: EditProjectController,
  ): ProjectRouter {
    return new ProjectRouter(
      addProjectController,
      getProjectController,
      deleteProjectController,
      editProjectController,
    );
  }

  static getBoardRouter(
    addBoardController: AddBoardController,
    getBoardController: GetBoardController,
    deleteBoardController: DeleteBoardController,
    removeUserController: RemoveUserController,
    addUserController: AddUserController,
  ): BoardRouter {
    return new BoardRouter(
      addBoardController,
      getBoardController,
      deleteBoardController,
      removeUserController,
      addUserController,
    );
  }

  static getListRouter(
    addListController: AddListController,
    getListController: GetListController,
    editListController: EditListController,
    deleteListController: DeleteListController,
    dragListController: DragListController,
  ): ListRouter {
    return new ListRouter(
      addListController,
      getListController,
      editListController,
      deleteListController,
      dragListController,
    );
  }

  static getCardRouter(
    addCardController: AddCardController,
    deleteCardController: DeleteCardController,
    editCardTextController: EditCardTextController,
    editCardDateController: EditCardDateController,
    editCardPriorityController: EditCardPriorityController,
    dragCardController: DragCardController,
  ): CardRouter {
    return new CardRouter(
      addCardController,
      deleteCardController,
      editCardTextController,
      editCardDateController,
      editCardPriorityController,
      dragCardController,
    );
  }
}

export default RouterSetup;
