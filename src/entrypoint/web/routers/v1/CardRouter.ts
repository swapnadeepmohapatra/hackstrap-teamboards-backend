/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
import { DEFAULT_ROUTE } from '../../../../config';
import BaseRouter from 'entrypoint/web/definitions/Router';
import { Router } from 'express';
import {
  AddCardController,
  DeleteCardController,
  DragCardController,
  EditCardDateController,
  EditCardPriorityController,
  EditCardTextController,
} from 'entrypoint/web/controllers/v1/cards';

class CardRouter implements BaseRouter {
  private router: Router;

  constructor(
    private addCardController: AddCardController,
    private deleteCardController: DeleteCardController,
    private editCardTextController: EditCardTextController,
    private editCardDateController: EditCardDateController,
    private editCardPriorityController: EditCardPriorityController,
    private dragCardController: DragCardController,
  ) {
    this.router = Router();
    this.configRouter();
  }

  private generateRoute = (...params: string[]) => {
    params.unshift(DEFAULT_ROUTE + '/card');
    return params.join('/');
  };

  private configRouter() {
    this.router.post(
      this.generateRoute('add'),
      this.addCardController.requestHandler(),
    );
    this.router.delete(
      this.generateRoute('delete'),
      this.deleteCardController.requestHandler(),
    );
    this.router.patch(
      this.generateRoute('edit-text'),
      this.editCardTextController.requestHandler(),
    );
    this.router.patch(
      this.generateRoute('edit-date'),
      this.editCardDateController.requestHandler(),
    );
    this.router.patch(
      this.generateRoute('edit-priority'),
      this.editCardPriorityController.requestHandler(),
    );
    this.router.put(
      this.generateRoute('drag'),
      this.dragCardController.requestHandler(),
    );
  }

  getRouter() {
    return this.router;
  }
}

export default CardRouter;
