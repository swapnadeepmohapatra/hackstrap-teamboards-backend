import { ExpressApp, ExpressAppConfig } from 'entrypoint/web';
import {
  BoardRouter,
  CardRouter,
  ListRouter,
  ProjectRouter,
} from 'entrypoint/web/routers/v1';

/**
 * WebAppSetup class is the class that takes in all the routers
 */
class WebAppSetup {
  /**
   * @param {ExpressAppConfig} config
   * @param {ProjectRouter} projectRouter
   * @param {BoardRouter} boardRouter
   * @param {ListRouter} listRouter
   * @param {CardRouter} cardRouter
   * @return {ExpressApp}
   */
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
