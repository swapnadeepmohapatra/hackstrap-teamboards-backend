/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable require-jsdoc */
import { UseCaseError } from '../../../../../core/definition';
import {
  GetListInvalidError,
  GetListRequestDTO,
  GetListUseCase,
} from '../../../../../core/usecases/list';
import BaseController from '../../../../../entrypoint/web/definitions/Controller';
import { Request, Response } from 'express';

class GetListController extends BaseController<GetListUseCase> {
  protected async processRequest(req: Request, res: Response) {
    const result = await this.usecase.execute(new GetListRequestDTO(req));

    if (result.isError) {
      const err = result.getError() as UseCaseError;
      this.logger.error(err.message, err.name);

      if (err instanceof GetListInvalidError) {
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

export default GetListController;
