/* eslint-disable require-jsdoc */
import { UseCaseError } from '../../../../../core/definition';
import {
  EditProjectInvalidError,
  EditProjectRequestDTO,
  EditProjectUseCase,
} from '../../../../../core/usecases/project/editProject';
import BaseController from '../../../../../entrypoint/web/definitions/Controller';
import { Request, Response } from 'express';

class EditProjectController extends BaseController<EditProjectUseCase> {
  protected async processRequest(req: Request, res: Response) {
    const result = await this.usecase.execute(new EditProjectRequestDTO(req));

    if (result.isError) {
      const err = result.getError() as UseCaseError;
      this.logger.error(err.message, err.name);

      if (err instanceof EditProjectInvalidError) {
        this.badRequest(res, err.message);
        return;
      }

      this.fail(res, err.message);
      return;
    }

    this.logger.info(`edited ${JSON.stringify(req.body)}`);
    this.ok(res);
    return;
  }
}

export default EditProjectController;
