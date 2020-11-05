import {
  BoardEntityGateway,
  AddBoardUseCase,
  GetBoardUseCase,
  DeleteBoardUseCase,
  RemoveUserUseCase,
  AddUserUseCase,
} from 'core/usecases/board';

class BoardUseCaseSetup {
  static addBoardUseCase(
    boardEntityGateway: BoardEntityGateway,
  ): AddBoardUseCase {
    return new AddBoardUseCase(boardEntityGateway);
  }

  static getBoardUseCase(
    boardEntityGateway: BoardEntityGateway,
  ): GetBoardUseCase {
    return new GetBoardUseCase(boardEntityGateway);
  }

  static deleteBoardUseCase(
    boardEntityGateway: BoardEntityGateway,
  ): DeleteBoardUseCase {
    return new DeleteBoardUseCase(boardEntityGateway);
  }

  static removeUserUseCase(
    boardEntityGateway: BoardEntityGateway,
  ): RemoveUserUseCase {
    return new RemoveUserUseCase(boardEntityGateway);
  }
  static addUserUseCase(
    boardEntityGateway: BoardEntityGateway,
  ): AddUserUseCase {
    return new AddUserUseCase(boardEntityGateway);
  }

  // static editBoardUseCase(
  //   BoardEntityGateway: BoardEntityGateway,
  // ): EditBoardUseCase {
  //   return new EditBoardUseCase(BoardEntityGateway);
  // }
}

export default BoardUseCaseSetup;
