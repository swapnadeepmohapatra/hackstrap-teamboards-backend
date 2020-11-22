import { PORT } from '../config';
import {
  ProjectUseCaseSetup,
  BoardUseCaseSetup,
  CardUseCaseSetup,
  ListUseCaseSetup,
} from './core';
import { DatabaseSetup } from './data';
import { ControllerSetup, RouterSetup, WebAppSetup } from './entrypoint/web';

/**
 * Main Function
 */
export function main(): void {
  // ================ DATABASE SETUP ====================
  const projectDB = DatabaseSetup.getProjectDB();
  const boardDB = DatabaseSetup.getBoardDB();
  const listDB = DatabaseSetup.getListDB();
  const cardDB = DatabaseSetup.getCardDB();

  // ================ USE CASE SETUP =====================
  // Project
  const addProjectUseCase = ProjectUseCaseSetup.addProjectUseCase(projectDB);
  const getProjectUseCase = ProjectUseCaseSetup.getProjectUseCase(projectDB);
  const deleteProjectUseCase = ProjectUseCaseSetup.deleteProjectUseCase(
    projectDB,
  );
  const editProjectUseCase = ProjectUseCaseSetup.editProjectUseCase(projectDB);

  // Board
  const addBoardUseCase = BoardUseCaseSetup.addBoardUseCase(boardDB);
  const getBoardUseCase = BoardUseCaseSetup.getBoardUseCase(boardDB);
  const deleteBoardUseCase = BoardUseCaseSetup.deleteBoardUseCase(boardDB);
  const removeUserUseCase = BoardUseCaseSetup.removeUserUseCase(boardDB);
  const addUserUseCase = BoardUseCaseSetup.addUserUseCase(boardDB);

  // List
  const addListUseCase = ListUseCaseSetup.addListUseCase(listDB);
  const getListUseCase = ListUseCaseSetup.getListUseCase(listDB);
  const editListUseCase = ListUseCaseSetup.editListUseCase(listDB);
  const deleteListUseCase = ListUseCaseSetup.deleteListUseCase(listDB);
  const dragListUseCase = ListUseCaseSetup.dragListUseCase(listDB);

  // Card
  const addCardUseCase = CardUseCaseSetup.addCardUseCase(cardDB);
  const deleteCardUseCase = CardUseCaseSetup.deleteCardUseCase(cardDB);
  const editCardTextUseCase = CardUseCaseSetup.editCardTextUseCase(cardDB);
  const editCardDateUseCase = CardUseCaseSetup.editCardDateUseCase(cardDB);
  const editCardPriorityUseCase = CardUseCaseSetup.editCardPriorityUseCase(
    cardDB,
  );
  const dragCardUseCase = CardUseCaseSetup.dragCardUseCase(cardDB);

  // ================ CONTROLLER SETUP ===================
  // Project
  const addProjectController = ControllerSetup.getAddProjectController(
    addProjectUseCase,
  );
  const getProjectController = ControllerSetup.getGetProjectController(
    getProjectUseCase,
  );
  const deleteProjectController = ControllerSetup.getDeleteProjectController(
    deleteProjectUseCase,
  );
  const editProjectController = ControllerSetup.getEditProjectController(
    editProjectUseCase,
  );

  // Board
  const addBoardController = ControllerSetup.getAddBoardController(
    addBoardUseCase,
  );
  const getBoardController = ControllerSetup.getGetBoardController(
    getBoardUseCase,
  );
  const deleteBoardController = ControllerSetup.getDeleteBoardController(
    deleteBoardUseCase,
  );
  const removeUserController = ControllerSetup.getRemoveUserController(
    removeUserUseCase,
  );
  const addUserController = ControllerSetup.getAddUserController(
    addUserUseCase,
  );

  // List
  const addListController = ControllerSetup.getAddListController(
    addListUseCase,
  );
  const getListController = ControllerSetup.getGetListController(
    getListUseCase,
  );
  const editListController = ControllerSetup.getEditListController(
    editListUseCase,
  );
  const deleteListController = ControllerSetup.getDeleteListController(
    deleteListUseCase,
  );
  const dragListController = ControllerSetup.getDragListController(
    dragListUseCase,
  );

  // Card
  const addCardController = ControllerSetup.getAddCardController(
    addCardUseCase,
  );
  const deleteCardController = ControllerSetup.getDeleteCardController(
    deleteCardUseCase,
  );
  const editCardTextController = ControllerSetup.getEditCardTextController(
    editCardTextUseCase,
  );
  const editCardDateController = ControllerSetup.getEditCardDateController(
    editCardDateUseCase,
  );
  const editCardPriorityController = ControllerSetup.getEditCardPriorityController(
    editCardPriorityUseCase,
  );
  const dragCardController = ControllerSetup.getDragCardController(
    dragCardUseCase,
  );

  // ================= ROUTER SETUP =======================
  // Project
  const projectRouter = RouterSetup.getProjectRouter(
    addProjectController,
    getProjectController,
    deleteProjectController,
    editProjectController,
  );

  // Board
  const boardRouter = RouterSetup.getBoardRouter(
    addBoardController,
    getBoardController,
    deleteBoardController,
    removeUserController,
    addUserController,
  );

  // List
  const listRouter = RouterSetup.getListRouter(
    addListController,
    getListController,
    editListController,
    deleteListController,
    dragListController,
  );

  // Card
  const cardRouter = RouterSetup.getCardRouter(
    addCardController,
    deleteCardController,
    editCardTextController,
    editCardDateController,
    editCardPriorityController,
    dragCardController,
  );

  // ================== EXPRESS APP SETUP =================
  const expressApp = WebAppSetup.getExpressApp(
    { port: PORT },
    projectRouter,
    boardRouter,
    listRouter,
    cardRouter,
  );

  // ================== BOOT THE APPLICATION ==============
  expressApp.boot();
}
