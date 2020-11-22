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
} from '../../../entrypoint/web';

/**
 * RouterSetup class is the class that setups up all the routers
 */
class RouterSetup {
  /**
   * @param {AddProjectController} addProjectController
   * @param {GetProjectController} getProjectController
   * @param {DeleteProjectController} deleteProjectController
   * @param {EditProjectController} editProjectController
   * @return {ProjectRouter}
   */
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

  /**
   * @param {AddBoardController} addBoardController
   * @param {GetBoardController} getBoardController
   * @param {DeleteBoardController} deleteBoardController
   * @param {RemoveUserController} removeUserController
   * @param {AddUserController} addUserController
   * @return {BoardRouter}
   */
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

  /**
   * @param {AddListController} addListController
   * @param {GetListController} getListController
   * @param {EditListController} editListController
   * @param {DeleteListController} deleteListController
   * @param {DragListController} dragListController
   * @return {ListRouter}
   */
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

  /**
   * @param {AddCardController} addCardController
   * @param {DeleteCardController} deleteCardController
   * @param {EditCardTextController} editCardTextController
   * @param {EditCardDateController} editCardDateController
   * @param {EditCardPriorityController} editCardPriorityController
   * @param {DragCardController} dragCardController
   * @return {CardRouter}
   */
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
