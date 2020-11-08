/* eslint-disable require-jsdoc */
/* eslint-disable new-cap */
import { DEFAULT_ROUTE } from '../../../../config';
import {
  AddProjectController,
  DeleteProjectController,
  EditProjectController,
  GetProjectController,
} from 'entrypoint/web';
import BaseRouter from 'entrypoint/web/definitions/Router';
import { Router } from 'express';

class ProjectRouter implements BaseRouter {
  private router: Router;

  constructor(
    private addProjectController: AddProjectController,
    private getProjectController: GetProjectController,
    private deleteProjectController: DeleteProjectController,
    private editProjectController: EditProjectController,
  ) {
    this.router = Router();
    this.configRouter();
  }

  private generateRoute = (...params: string[]) => {
    params.unshift(DEFAULT_ROUTE + '/project');
    return params.join('/');
  };

  private configRouter() {
    this.router.post(
      this.generateRoute('add'),
      this.addProjectController.requestHandler(),
    );

    this.router.get(
      this.generateRoute(''),
      this.getProjectController.requestHandler(),
    );

    this.router.delete(
      this.generateRoute('delete'),
      this.deleteProjectController.requestHandler(),
    );

    this.router.patch(
      this.generateRoute('edit'),
      this.editProjectController.requestHandler(),
    );
  }

  getRouter() {
    return this.router;
  }
}

export default ProjectRouter;
