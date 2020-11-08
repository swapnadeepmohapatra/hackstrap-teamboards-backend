/* eslint-disable require-jsdoc */
import { UseCaseError } from 'core/definition';
import {
  AddProjectInvalidError,
  AddProjectRequestDTO,
  AddProjectUseCase,
} from 'core/usecases/project';
import BaseController from 'entrypoint/web/definitions/Controller';
import { Request, Response } from 'express';

class AddProjectController extends BaseController<AddProjectUseCase> {
  protected async processRequest(req: Request, res: Response) {
    const result = await this.usecase.execute(new AddProjectRequestDTO(req));

    if (result.isError) {
      const err = result.getError() as UseCaseError;
      this.logger.error(err.message, err.name);

      if (err instanceof AddProjectInvalidError) {
        this.badRequest(res, err.message);
        return;
      }

      this.fail(res, err.message);
      return;
    }

    this.logger.info(`created ${JSON.stringify(req.body)}`);
    this.created(res);
    return;
  }
}

export default AddProjectController;
