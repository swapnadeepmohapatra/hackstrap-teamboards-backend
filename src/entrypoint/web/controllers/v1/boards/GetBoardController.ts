/* eslint-disable require-jsdoc */
import { UseCaseError } from '../../../../../core/definition';
import {
  GetBoardInvalidError,
  GetBoardRequestDTO,
  GetBoardUseCase,
} from '../../../../../core/usecases/board';
import BaseController from '../../../../../entrypoint/web/definitions/Controller';
import { Request, Response } from 'express';

class GetBoardController extends BaseController<GetBoardUseCase> {
  protected async processRequest(req: Request, res: Response) {
    const result = await this.usecase.execute(new GetBoardRequestDTO(req));

    if (result.isError) {
      const err = result.getError() as UseCaseError;
      this.logger.error(err.message, err.name);

      if (err instanceof GetBoardInvalidError) {
        this.badRequest(res, err.message);
        return;
      }

      this.fail(res, err.message);
      return;
    }

    this.ok(res, result.getValue());
    return;
  }
}

export default GetBoardController;
