/* eslint-disable require-jsdoc */
import { UseCaseError } from '../../../../../core/definition';
import { DeleteCardUseCase } from '../../../../../core/usecases/card';
import {
  DeleteCardInvalidError,
  DeleteCardRequestDTO,
} from '../../../../../core/usecases/card';
import BaseController from '../../../../../entrypoint/web/definitions/Controller';
import { Request, Response } from 'express';

class DeleteCardController extends BaseController<DeleteCardUseCase> {
  protected async processRequest(req: Request, res: Response) {
    const result = await this.usecase.execute(new DeleteCardRequestDTO(req));

    if (result.isError) {
      const err = result.getError() as UseCaseError;
      this.logger.error(err.message, err.name);

      if (err instanceof DeleteCardInvalidError) {
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

export default DeleteCardController;
