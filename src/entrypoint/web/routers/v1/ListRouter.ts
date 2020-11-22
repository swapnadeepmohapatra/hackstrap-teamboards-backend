/* eslint-disable require-jsdoc */
/* eslint-disable new-cap */
import { DEFAULT_ROUTE } from '../../../../config';
import { Router } from 'express';
import {
  AddListController,
  DeleteListController,
  DragListController,
  EditListController,
  GetListController,
} from '../../../../entrypoint/web';
import BaseRouter from '../../../../entrypoint/web/definitions/Router';

class ListRouter implements BaseRouter {
  private router: Router;

  constructor(
    private addListController: AddListController,
    private getListController: GetListController,
    private editListController: EditListController,
    private deleteListController: DeleteListController,
    private dragListController: DragListController,
  ) {
    this.router = Router();
    this.configRouter();
  }

  private generateRoute = (...params: string[]) => {
    params.unshift(DEFAULT_ROUTE + '/list');
    return params.join('/');
  };

  private configRouter() {
    this.router.post(
      this.generateRoute('add'),
      this.addListController.requestHandler(),
    );
    this.router.get(
      this.generateRoute(''),
      this.getListController.requestHandler(),
    );
    this.router.patch(
      this.generateRoute('edit'),
      this.editListController.requestHandler(),
    );
    this.router.delete(
      this.generateRoute('delete'),
      this.deleteListController.requestHandler(),
    );
    this.router.put(
      this.generateRoute('drag'),
      this.dragListController.requestHandler(),
    );
  }

  getRouter() {
    return this.router;
  }
}

export default ListRouter;
