import {
  AddProjectUseCase,
  DeleteProjectUseCase,
  EditProjectUseCase,
  GetProjectUseCase,
} from 'core/usecases/project';
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
} from 'entrypoint/web/';
import {
  AddBoardUseCase,
  AddUserUseCase,
  DeleteBoardUseCase,
  GetBoardUseCase,
  RemoveUserUseCase,
} from 'core/usecases/board';
import {
  AddCardUseCase,
  DeleteCardUseCase,
  DragCardUseCase,
  EditCardDateUseCase,
  EditCardPriorityUseCase,
  EditCardTextUseCase,
} from 'core/usecases/card';
import {
  AddListUseCase,
  DeleteListUseCase,
  DragListUseCase,
  EditListUseCase,
  GetListUseCase,
} from 'core/usecases/list';

class ControllerSetup {
  static getAddProjectController(
    addProjectUseCase: AddProjectUseCase,
  ): AddProjectController {
    return new AddProjectController(addProjectUseCase);
  }

  static getGetProjectController(
    getProjectUseCase: GetProjectUseCase,
  ): GetProjectController {
    return new GetProjectController(getProjectUseCase);
  }

  static getDeleteProjectController(
    getProjectUseCase: DeleteProjectUseCase,
  ): DeleteProjectController {
    return new DeleteProjectController(getProjectUseCase);
  }

  static getEditProjectController(
    getProjectUseCase: EditProjectUseCase,
  ): EditProjectController {
    return new EditProjectController(getProjectUseCase);
  }

  static getAddBoardController(
    addBoardUseCase: AddBoardUseCase,
  ): AddBoardController {
    return new AddBoardController(addBoardUseCase);
  }

  static getGetBoardController(
    addBoardUseCase: GetBoardUseCase,
  ): GetBoardController {
    return new GetBoardController(addBoardUseCase);
  }
  static getDeleteBoardController(
    getProjectUseCase: DeleteBoardUseCase,
  ): DeleteBoardController {
    return new DeleteBoardController(getProjectUseCase);
  }
  static getRemoveUserController(
    removeUserUseCase: RemoveUserUseCase,
  ): RemoveUserController {
    return new RemoveUserController(removeUserUseCase);
  }
  static getAddUserController(
    addUserUseCase: AddUserUseCase,
  ): AddUserController {
    return new AddUserController(addUserUseCase);
  }

  static getAddListController(
    addUserUseCase: AddListUseCase,
  ): AddListController {
    return new AddListController(addUserUseCase);
  }
  static getGetListController(
    addUserUseCase: GetListUseCase,
  ): GetListController {
    return new GetListController(addUserUseCase);
  }
  static getEditListController(
    editListUseCase: EditListUseCase,
  ): EditListController {
    return new EditListController(editListUseCase);
  }
  static getDeleteListController(
    addUserUseCase: DeleteListUseCase,
  ): DeleteListController {
    return new DeleteListController(addUserUseCase);
  }
  static getDragListController(
    dragListUseCase: DragListUseCase,
  ): DragListController {
    return new DragListController(dragListUseCase);
  }

  static getAddCardController(
    addUserUseCase: AddCardUseCase,
  ): AddCardController {
    return new AddCardController(addUserUseCase);
  }
  static getDeleteCardController(
    deleteCardUseCase: DeleteCardUseCase,
  ): DeleteCardController {
    return new DeleteCardController(deleteCardUseCase);
  }
  static getEditCardTextController(
    editCardTextUseCase: EditCardTextUseCase,
  ): EditCardTextController {
    return new EditCardTextController(editCardTextUseCase);
  }
  static getEditCardDateController(
    editCardDateUseCase: EditCardDateUseCase,
  ): EditCardDateController {
    return new EditCardDateController(editCardDateUseCase);
  }
  static getEditCardPriorityController(
    editCardPriorityUseCase: EditCardPriorityUseCase,
  ): EditCardPriorityController {
    return new EditCardPriorityController(editCardPriorityUseCase);
  }
  static getDragCardController(
    dragCardUseCase: DragCardUseCase,
  ): DragCardController {
    return new DragCardController(dragCardUseCase);
  }
}

export default ControllerSetup;
