/* eslint-disable no-invalid-this */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */
import { UseCase } from 'core/definition';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { Logger } from 'src/utils';
/**
 * @param  {RequestHandler} middleware
 */
export function awaitHandlerFactory(middleware: RequestHandler) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await middleware(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}
/**
 * @param  {this.constructor.name.toString(} {prefix
 */

abstract class BaseController<T extends UseCase = UseCase> {
  protected logger = new Logger({ prefix: this.constructor.name.toString() });

  constructor(protected usecase: T) {}

  // protected abstract async processRequest(
  protected abstract processRequest(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void>;

  public requestHandler(): RequestHandler {
    return awaitHandlerFactory(this.processRequest.bind(this));
  }

  /**
   * ok sends a 200 response to the http client and also
   * sends the generated reponse if any
   * @param res
   * @param dto
   */
  protected ok<T>(res: Response, dto?: T) {
    if (dto) return res.status(200).json(dto);
    return res.sendStatus(200);
  }

  /**
   * created sends a 201 response to the http client and also
   * sends the generated reponse if any
   * @param res
   * @param payload
   */
  protected created<T>(res: Response, payload?: T): {} {
    if (payload) return res.status(201).json(payload);
    return res.sendStatus(201);
  }

  /**
   * deleted sends a 201 response to the http client and also
   * sends the generated reponse if any
   * @param res
   * @param payload
   */
  protected deleted<T>(res: Response, payload?: T): {} {
    if (payload) return res.status(201).json(payload);
    return res.sendStatus(202);
  }

  /**
   * fail sends a 500 response to the http client and
   * also sends error if any
   * @param res
   * @param error
   */
  protected fail(res: Response, error: Error | string) {
    return res.status(500).json({
      message: error.toString(),
    });
  }

  /**
   * badRequest sends a 400 response to the http client along with the
   * passed message
   * @param res
   * @param message
   */
  protected badRequest(res: Response, message?: string): {} {
    return BaseController.jsonResponse(res, 400, {
      message: message || 'bad requst',
    });
  }

  /**
   * unauthorized sends a 401 response to the http client along
   * with the message
   * @param res
   * @param message
   */
  protected unauthorized(res: Response, message?: string): {} {
    return BaseController.jsonResponse(res, 401, {
      message: message || 'Unauthorized',
    });
  }

  /**
   * forbidden sends a 403 response to the http client along
   * with the message
   * @param res
   * @param message
   */
  protected forbidden(res: Response, message?: string): {} {
    return BaseController.jsonResponse(res, 403, {
      message: message || 'Forbidden',
    });
  }

  /**
   * notFound sends a 404 response to the http client along witht he message
   * @param res
   * @param message
   */
  protected notFound(res: Response, message?: string): {} {
    return BaseController.jsonResponse(res, 404, {
      message: message || 'Not found',
    });
  }

  protected static jsonResponse(res: Response, code: number, payload: {}): {} {
    return res.status(code).json(payload);
  }
}

export default BaseController;
