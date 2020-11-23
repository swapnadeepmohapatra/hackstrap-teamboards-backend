/* eslint-disable require-jsdoc */
import { UseCaseError } from '../../../../../core/definition';
import { DeleteBoardUseCase } from '../../../../../core/usecases/board';
import {
  DeleteBoardInvalidError,
  DeleteBoardRequestDTO,
} from '../../../../../core/usecases/board';
import BaseController from '../../../../../entrypoint/web/definitions/Controller';
import { Request, Response } from 'express';

class DeleteBoardController extends BaseController<DeleteBoardUseCase> {
  protected async processRequest(req: Request, res: Response) {
    const result = await this.usecase.execute(new DeleteBoardRequestDTO(req));

    if (result.isError) {
      const err = result.getError() as UseCaseError;
      this.logger.error(err.message, err.name);

      if (err instanceof DeleteBoardInvalidError) {
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

export default DeleteBoardController;
