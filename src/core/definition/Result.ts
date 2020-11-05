import UseCaseError from "core/definition/UseCaseError";

class Result<T, E = UseCaseError> {
  private value?: T;
  private error?: E;

  public isError: boolean;

  constructor(error?: E, value?: T) {
    if (error) {
      this.isError = true;
      this.error = error;
    } else {
      this.isError = false;
      this.value = value;
    }
  }

  public getValue(): T {
    if (this.isError) {
      throw new Error(
        "Can't get the value of an error result. Use 'errorValue' instead."
      );
    }

    return this.value as T;
  }

  public getError(): E | undefined {
    if (this.isError) {
      return this.error as E;
    }

    return undefined;
  }

  public static fail<U, E extends UseCaseError>(error: E): Result<U, E> {
    return new Result<U, E>(error);
  }

  public static ok<T>(result: T): Result<T> {
    return new Result<T>(undefined, result);
  }
}

export default Result;
