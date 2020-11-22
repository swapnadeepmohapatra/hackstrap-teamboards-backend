/* eslint-disable require-jsdoc */
import { UseCaseError } from '../../../../../core/definition';
import {
  DeleteProjectInvalidError,
  DeleteProjectRequestDTO,
  DeleteProjectUseCase,
} from '../../../../../core/usecases/project';
import BaseController from '../../../../../entrypoint/web/definitions/Controller';
import { Request, Response } from 'express';

class DeleteProjectController extends BaseController<DeleteProjectUseCase> {
  protected async processRequest(req: Request, res: Response) {
    const result = await this.usecase.execute(new DeleteProjectRequestDTO(req));

    if (result.isError) {
      const err = result.getError() as UseCaseError;
      this.logger.error(err.message, err.name);

      if (err instanceof DeleteProjectInvalidError) {
        this.badRequest(res, err.message);
        return;
      }

      this.fail(res, err.message);
      return;
    }

    this.logger.info(`deleted ${JSON.stringify(req.body)}`);
    this.deleted(res);
    return;
  }
}

export default DeleteProjectController;
