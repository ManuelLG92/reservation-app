import { z } from "zod";

export class ValidationError extends Error {
  constructor(
    message: string,
    public readonly details?: Record<string, unknown>,
  ) {
    super(message);
    this.details = this.details ?? {};
  }
}
export const validate = async <T extends z.Schema>(
  schema: T,
  data: Record<string, unknown> | string | number,
): Promise<z.infer<T>> => {
  const result = await schema.safeParseAsync(data);
  if (!result.success) {
    const errors = result.error.errors.reduce((acc, current) => {
      const errorsFormatted = { [current.path.join(".")]: current.message };
      return { ...acc, ...errorsFormatted };
    }, {});

    throw new ValidationError("Validation Error", errors);
  }
  return result.data;
};
