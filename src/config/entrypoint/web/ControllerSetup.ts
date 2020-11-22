import {
  AddProjectUseCase,
  DeleteProjectUseCase,
  EditProjectUseCase,
  GetProjectUseCase,
} from '../../../core/usecases/project';
import {
  GetProjectController,
  AddProjectController,
  DeleteProjectController,
  EditProjectController,
  AddBoardController,
  DeleteBoardController,
  GetBoardController,
  RemoveUserController,
  AddUserController,
  AddCardController,
  AddListController,
  EditListController,
  GetListController,
  DeleteListController,
  DragListController,
  DeleteCardController,
  EditCardTextController,
  EditCardDateController,
  EditCardPriorityController,
  DragCardController,
} from '../../../entrypoint/web';
import {
  AddBoardUseCase,
  AddUserUseCase,
  DeleteBoardUseCase,
  GetBoardUseCase,
  RemoveUserUseCase,
} from '../../../core/usecases/board';
import {
  AddCardUseCase,
  DeleteCardUseCase,
  DragCardUseCase,
  EditCardDateUseCase,
  EditCardPriorityUseCase,
  EditCardTextUseCase,
} from '../../../core/usecases/card';
import {
  AddListUseCase,
  DeleteListUseCase,
  DragListUseCase,
  EditListUseCase,
  GetListUseCase,
} from '../../../core/usecases/list';

/**
 * ControllerSetup is the class thjat setsup all the controllers.
 */
class ControllerSetup {
  /**
   * @param  {AddProjectUseCase} addProjectUseCase
   * @return {AddProjectController}
   */
  static getAddProjectController(
    addProjectUseCase: AddProjectUseCase,
  ): AddProjectController {
    return new AddProjectController(addProjectUseCase);
  }

  /**
   * @param  {GetProjectUseCase} getProjectUseCase
   * @return {GetProjectController}
   */
  static getGetProjectController(
    getProjectUseCase: GetProjectUseCase,
  ): GetProjectController {
    return new GetProjectController(getProjectUseCase);
  }

  /**
   * @param  {DeleteProjectUseCase} getProjectUseCase
   * @return {DeleteProjectController}
   */
  static getDeleteProjectController(
    getProjectUseCase: DeleteProjectUseCase,
  ): DeleteProjectController {
    return new DeleteProjectController(getProjectUseCase);
  }

  /**
   * @param  {EditProjectUseCase} getProjectUseCase
   * @return {EditProjectController}
   */
  static getEditProjectController(
    getProjectUseCase: EditProjectUseCase,
  ): EditProjectController {
    return new EditProjectController(getProjectUseCase);
  }

  /**
   * @param  {AddBoardUseCase} addBoardUseCase
   * @return {AddBoardController}
   */
  static getAddBoardController(
    addBoardUseCase: AddBoardUseCase,
  ): AddBoardController {
    return new AddBoardController(addBoardUseCase);
  }

  /**
   * @param  {GetBoardUseCase} addBoardUseCase
   * @return {GetBoardController}
   */
  static getGetBoardController(
    addBoardUseCase: GetBoardUseCase,
  ): GetBoardController {
    return new GetBoardController(addBoardUseCase);
  }

  /**
   * @param  {DeleteBoardUseCase} getProjectUseCase
   * @return {DeleteBoardController}
   */
  static getDeleteBoardController(
    getProjectUseCase: DeleteBoardUseCase,
  ): DeleteBoardController {
    return new DeleteBoardController(getProjectUseCase);
  }

  /**
   * @param  {RemoveUserUseCase} removeUserUseCase
   * @return {RemoveUserController}
   */
  static getRemoveUserController(
    removeUserUseCase: RemoveUserUseCase,
  ): RemoveUserController {
    return new RemoveUserController(removeUserUseCase);
  }

  /**
   * @param  {AddUserUseCase} addUserUseCase
   * @return {AddUserController}
   */
  static getAddUserController(
    addUserUseCase: AddUserUseCase,
  ): AddUserController {
    return new AddUserController(addUserUseCase);
  }

  /**
   * @param  {AddListUseCase} addUserUseCase
   * @return {AddListController}
   */
  static getAddListController(
    addUserUseCase: AddListUseCase,
  ): AddListController {
    return new AddListController(addUserUseCase);
  }

  /**
   * @param  {GetListUseCase} addUserUseCase
   * @return {GetListController}
   */
  static getGetListController(
    addUserUseCase: GetListUseCase,
  ): GetListController {
    return new GetListController(addUserUseCase);
  }

  /**
   * @param  {EditListUseCase} editListUseCase
   * @return {EditListController}
   */
  static getEditListController(
    editListUseCase: EditListUseCase,
  ): EditListController {
    return new EditListController(editListUseCase);
  }

  /**
   * @param  {DeleteListUseCase} addUserUseCase
   * @return {DeleteListController}
   */
  static getDeleteListController(
    addUserUseCase: DeleteListUseCase,
  ): DeleteListController {
    return new DeleteListController(addUserUseCase);
  }

  /**
   * @param  {DragListUseCase} dragListUseCase
   * @return {DragListController}
   */
  static getDragListController(
    dragListUseCase: DragListUseCase,
  ): DragListController {
    return new DragListController(dragListUseCase);
  }

  /**
   * @param  {AddCardUseCase} addUserUseCase
   * @return {DeleteCardController}
   */
  static getAddCardController(
    addUserUseCase: AddCardUseCase,
  ): AddCardController {
    return new AddCardController(addUserUseCase);
  }

  /**
   * @param  {DeleteCardUseCase} deleteCardUseCase
   * @return {DeleteCardController}
   */
  static getDeleteCardController(
    deleteCardUseCase: DeleteCardUseCase,
  ): DeleteCardController {
    return new DeleteCardController(deleteCardUseCase);
  }

  /**
   * @param  {EditCardTextUseCase} editCardTextUseCase
   * @return {EditCardTextController}
   */
  static getEditCardTextController(
    editCardTextUseCase: EditCardTextUseCase,
  ): EditCardTextController {
    return new EditCardTextController(editCardTextUseCase);
  }

  /**
   * @param  {EditCardDateUseCase} editCardDateUseCase
   * @return {EditCardDateController}
   */
  static getEditCardDateController(
    editCardDateUseCase: EditCardDateUseCase,
  ): EditCardDateController {
    return new EditCardDateController(editCardDateUseCase);
  }

  /**
   * @param  {EditCardPriorityUseCase} editCardPriorityUseCase
   * @return {EditCardPriorityController}
   */
  static getEditCardPriorityController(
    editCardPriorityUseCase: EditCardPriorityUseCase,
  ): EditCardPriorityController {
    return new EditCardPriorityController(editCardPriorityUseCase);
  }

  /**
   * @param  {DragCardUseCase} dragCardUseCase
   * @return {DragCardController}
   */
  static getDragCardController(
    dragCardUseCase: DragCardUseCase,
  ): DragCardController {
    return new DragCardController(dragCardUseCase);
  }
}

export default ControllerSetup;
