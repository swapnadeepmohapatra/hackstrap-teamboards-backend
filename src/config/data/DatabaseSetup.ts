import {
  BoardDBEntityGateway,
  CardDBEntityGateway,
  ListDBEntityGateway,
  ProjectDBEntityGateway,
} from 'data/index';

class DatabaseSetup {
  static getProjectDB(): ProjectDBEntityGateway {
    return new ProjectDBEntityGateway();
  }

  static getBoardDB(): BoardDBEntityGateway {
    return new BoardDBEntityGateway();
  }

  static getCardDB(): CardDBEntityGateway {
    return new CardDBEntityGateway();
  }

  static getListDB(): ListDBEntityGateway {
    return new ListDBEntityGateway();
  }
}

export default DatabaseSetup;
