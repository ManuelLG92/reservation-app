import { BaseError } from "src/common/errors/base-error.ts";
import { httpStatusCodes } from "src/common/errors/http-status-codes.ts";

export class NotFoundError extends BaseError {
  readonly status = httpStatusCodes.NOT_FOUND;
  constructor(
    message: string,
  ) {
    super(message);
  }
}
