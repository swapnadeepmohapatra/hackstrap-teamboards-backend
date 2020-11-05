import { UseCaseError } from 'core/definition';
import {
  AddListInvalidError,
  AddListRequestDTO,
  AddListUseCase,
} from 'core/usecases/List';
import BaseController from 'entrypoint/web/definitions/Controller';
import { Request, Response } from 'express';

class AddListController extends BaseController<AddListUseCase> {
  protected async processRequest(req: Request, res: Response) {
    const result = await this.usecase.execute(new AddListRequestDTO(req));

    if (result.isError) {
      const err = result.getError() as UseCaseError;
      this.logger.error(err.message, err.name);

      if (err instanceof AddListInvalidError) {
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

export default AddListController;
