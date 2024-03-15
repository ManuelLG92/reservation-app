import { BaseError } from "src/common/errors/base-error.ts";
import { httpStatusCodes } from "src/common/errors/http-status-codes.ts";

export class BadRequestError extends BaseError {
  readonly status = httpStatusCodes.BAD_REQUEST;
  constructor(
    message: string,
  ) {
    super(message);
  }
}
