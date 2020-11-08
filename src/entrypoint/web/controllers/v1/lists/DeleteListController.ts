/* eslint-disable require-jsdoc */
import { UseCaseError } from 'core/definition';
import { DeleteListUseCase } from 'core/usecases/list';
import {
  DeleteListInvalidError,
  DeleteListRequestDTO,
} from 'core/usecases/list';
import BaseController from 'entrypoint/web/definitions/Controller';
import { Request, Response } from 'express';

class DeleteListController extends BaseController<DeleteListUseCase> {
  protected async processRequest(req: Request, res: Response) {
    const result = await this.usecase.execute(new DeleteListRequestDTO(req));

    if (result.isError) {
      const err = result.getError() as UseCaseError;
      this.logger.error(err.message, err.name);

      if (err instanceof DeleteListInvalidError) {
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

export default DeleteListController;
