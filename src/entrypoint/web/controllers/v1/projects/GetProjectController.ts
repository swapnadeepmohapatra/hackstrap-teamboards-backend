import { UseCaseError } from 'core/definition';
import {
  GetProjectInvalidError,
  GetProjectRequestDTO,
  GetProjectUseCase,
} from 'core/usecases/project';
import BaseController from 'entrypoint/web/definitions/Controller';
import { Request, Response } from 'express';

class GetProjectController extends BaseController<GetProjectUseCase> {
  protected async processRequest(req: Request, res: Response) {
    const result = await this.usecase.execute(new GetProjectRequestDTO(req));

    if (result.isError) {
      const err = result.getError() as UseCaseError;
      this.logger.error(err.message, err.name);

      if (err instanceof GetProjectInvalidError) {
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

export default GetProjectController;
