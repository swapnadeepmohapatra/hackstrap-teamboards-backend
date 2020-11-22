import {
  BoardEntityGateway,
  AddBoardUseCase,
  GetBoardUseCase,
  DeleteBoardUseCase,
  RemoveUserUseCase,
  AddUserUseCase,
} from '../../core/usecases/board';

/**
 * Setsup the Use Cases of Board
 */
class BoardUseCaseSetup {
  /**
   * @param  {BoardEntityGateway} boardEntityGateway
   * @return {AddUserUseCase}
   */
  static addBoardUseCase(
    boardEntityGateway: BoardEntityGateway,
  ): AddBoardUseCase {
    return new AddBoardUseCase(boardEntityGateway);
  }

  /**
   * @param  {BoardEntityGateway} boardEntityGateway
   * @return {GetBoardUseCase}
   */
  static getBoardUseCase(
    boardEntityGateway: BoardEntityGateway,
  ): GetBoardUseCase {
    return new GetBoardUseCase(boardEntityGateway);
  }

  /**
   * @param  {BoardEntityGateway} boardEntityGateway
   * @return {DeleteBoardUseCase}
   */
  static deleteBoardUseCase(
    boardEntityGateway: BoardEntityGateway,
  ): DeleteBoardUseCase {
    return new DeleteBoardUseCase(boardEntityGateway);
  }

  /**
   * @param  {BoardEntityGateway} boardEntityGateway
   * @return {RemoveUserUseCase}
   */
  static removeUserUseCase(
    boardEntityGateway: BoardEntityGateway,
  ): RemoveUserUseCase {
    return new RemoveUserUseCase(boardEntityGateway);
  }

  /**
   * @param  {BoardEntityGateway} boardEntityGateway
   * @return {AddUserUseCase}
   */
  static addUserUseCase(
    boardEntityGateway: BoardEntityGateway,
  ): AddUserUseCase {
    return new AddUserUseCase(boardEntityGateway);
  }
}

export default BoardUseCaseSetup;
