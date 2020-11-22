/* eslint-disable require-jsdoc */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { UseCaseError } from '../../../../../core/definition';
import {
  DragCardInvalidError,
  DragCardRequestDTO,
  DragCardUseCase,
} from '../../../../../core/usecases/card';
import BaseController from '../../../../../entrypoint/web/definitions/Controller';
import { Request, Response } from 'express';

class DragCardController extends BaseController<DragCardUseCase> {
  protected async processRequest(req: Request, res: Response) {
    const result = await this.usecase.execute(new DragCardRequestDTO(req));

    if (result.isError) {
      const err = result.getError() as UseCaseError;
      this.logger.error(err.message, err.name);

      if (err instanceof DragCardInvalidError) {
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

export default DragCardController;
