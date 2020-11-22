/* eslint-disable require-jsdoc */

import { Application, default as express } from 'express';
import cors from 'cors';
import { Logger } from '../../utils';
import {
  BoardRouter,
  ProjectRouter,
  CardRouter,
  ListRouter,
} from './routers/v1';

export interface ExpressAppConfig {
  port: number;
}

class ExpressApp {
  private app: Application;
  private logger: Logger;

  constructor(
    private config: ExpressAppConfig,
    private projectRouter: ProjectRouter,
    private boardRouter: BoardRouter,
    private listRouter: ListRouter,
    private cardRouter: CardRouter,
  ) {
    this.app = express();
    this.logger = new Logger({ prefix: 'SERVER' });
  }

  private configApp(): void {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(this.projectRouter.getRouter());
    this.app.use(this.boardRouter.getRouter());
    this.app.use(this.listRouter.getRouter());
    this.app.use(this.cardRouter.getRouter());
  }

  boot(): Application {
    if (!this.app) {
      this.app = express();
    }

    this.configApp();
    this.app.listen(this.config.port, () => {
      this.logger.info(`Server running on port: ${this.config.port}`);
    });

    return this.app;
  }
}

export default ExpressApp;
