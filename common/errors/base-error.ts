import { StatusCode } from "http-status";

export abstract class BaseError extends Error {
  abstract readonly status: StatusCode;
  protected constructor(
    message: string,
  ) {
    super(message);
  }

  stackTrace() {
    return this.stack;
  }
}
