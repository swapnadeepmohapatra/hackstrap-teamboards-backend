import { ExpressApp, ExpressAppConfig } from 'entrypoint/web';
import {
  BoardRouter,
  CardRouter,
  ListRouter,
  ProjectRouter,
} from 'entrypoint/web/routers/v1';

class WebAppSetup {
  static getExpressApp(
    config: ExpressAppConfig,
    projectRouter: ProjectRouter,
    boardRouter: BoardRouter,
    listRouter: ListRouter,
    cardRouter: CardRouter,
  ): ExpressApp {
    return new ExpressApp(
      config,
      projectRouter,
      boardRouter,
      listRouter,
      cardRouter,
    );
  }
}

export default WebAppSetup;
