/* eslint-disable require-jsdoc */
import { UseCaseError } from 'core/definition';
import { EditCardPriorityUseCase } from 'core/usecases/card';
import {
  EditCardPriorityInvalidError,
  EditCardPriorityRequestDTO,
} from 'core/usecases/card';
import BaseController from 'entrypoint/web/definitions/Controller';
import { Request, Response } from 'express';

class EditCardPriorityController extends BaseController<
  EditCardPriorityUseCase
> {
  protected async processRequest(req: Request, res: Response) {
    const result = await this.usecase.execute(
      new EditCardPriorityRequestDTO(req),
    );

    if (result.isError) {
      const err = result.getError() as UseCaseError;
      this.logger.error(err.message, err.name);

      if (err instanceof EditCardPriorityInvalidError) {
        this.badRequest(res, err.message);
        return;
      }

      this.fail(res, err.message);
      return;
    }

    this.logger.info(`edited ${JSON.stringify(req.body)}`);
    this.deleted(res);
    return;
  }
}

export default EditCardPriorityController;
