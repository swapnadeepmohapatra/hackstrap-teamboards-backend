/* eslint-disable require-jsdoc */
import { UseCaseError } from 'core/definition';
import { EditCardTextUseCase } from 'core/usecases/card';
import {
  EditCardTextInvalidError,
  EditCardTextRequestDTO,
} from 'core/usecases/card';
import BaseController from 'entrypoint/web/definitions/Controller';
import { Request, Response } from 'express';

class EditCardTextController extends BaseController<EditCardTextUseCase> {
  protected async processRequest(req: Request, res: Response) {
    const result = await this.usecase.execute(new EditCardTextRequestDTO(req));

    if (result.isError) {
      const err = result.getError() as UseCaseError;
      this.logger.error(err.message, err.name);

      if (err instanceof EditCardTextInvalidError) {
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

export default EditCardTextController;
