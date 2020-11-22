/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
import { DEFAULT_ROUTE } from '../../../../config';
import {
  AddBoardController,
  DeleteBoardController,
  GetBoardController,
  RemoveUserController,
  AddUserController,
} from '../../../../entrypoint/web';
import BaseRouter from '../../../../entrypoint/web/definitions/Router';
import { Router } from 'express';

class BoardRouter implements BaseRouter {
  private router: Router;

  constructor(
    private addBoardController: AddBoardController,
    private getBoardController: GetBoardController,
    private deleteBoardController: DeleteBoardController,
    private removeUserController: RemoveUserController,
    private addUserController: AddUserController,
  ) {
    this.router = Router();
    this.configRouter();
  }

  private generateRoute = (...params: string[]) => {
    params.unshift(DEFAULT_ROUTE + '/board');
    return params.join('/');
  };

  private configRouter() {
    this.router.post(
      this.generateRoute('add'),
      this.addBoardController.requestHandler(),
    );
    this.router.get(
      this.generateRoute(''),
      this.getBoardController.requestHandler(),
    );
    this.router.delete(
      this.generateRoute('delete'),
      this.deleteBoardController.requestHandler(),
    );
    this.router.patch(
      this.generateRoute('remove-user'),
      this.removeUserController.requestHandler(),
    );
    this.router.patch(
      this.generateRoute('add-user'),
      this.addUserController.requestHandler(),
    );
  }

  getRouter() {
    return this.router;
  }
}

export default BoardRouter;
