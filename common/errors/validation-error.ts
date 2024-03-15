import { BaseError } from "src/common/errors/base-error.ts";

export class ValidationError extends BaseError {
  readonly status = 422;
  constructor(
    message: string,
    public readonly details?: Record<string, unknown>,
  ) {
    super(message);
    this.details = this.details ?? {};
  }
}
