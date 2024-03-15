import { validate } from "src/common/infrastructure/validator/validator.ts";
import { LoggerInterface } from "src/common/observability/logger.ts";
import { findSeatByIdSchema } from "src/seat/router/controller/find-seats/find-seats.schema.ts";
import { FindSeatsUseCase } from "src/seat/use-cases/find-seats-use-case.ts";
import { Context } from "hono";

export class FindSeatsController {
  constructor(
    private readonly logger: LoggerInterface,
    private readonly useCase: FindSeatsUseCase,
  ) {
    this.findById = this.findById.bind(this);
  }

  async findById(ctx: Context) {
    this.logger.info("Booking a slot");
    const paramId = ctx.req.param("id");
    const id = await validate(findSeatByIdSchema, paramId);

    const result = await this.useCase.findById(id);

    return ctx.json({ ...result }, 200);
  }
}
