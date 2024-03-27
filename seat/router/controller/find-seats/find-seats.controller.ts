import { validate } from "src/common/infrastructure/validator/validator.ts";
import { LoggerInterface } from "src/common/observability/logger.ts";
import {
  findSeatByIdSchema,
  findSeatsSchema,
} from "src/seat/router/controller/find-seats/find-seats.schema.ts";
import { FindSeatsUseCase } from "src/seat/use-cases/find-seats-use-case.ts";
import { Context } from "hono";

export class FindSeatsController {
  constructor(
    private readonly logger: LoggerInterface,
    private readonly useCase: FindSeatsUseCase,
  ) {
    this.findById = this.findById.bind(this);
    this.findAll = this.findAll.bind(this);
  }

  async findById(ctx: Context) {
    const paramId = ctx.req.param("id");
    const queryParams = ctx.req.query();

    const [id, filters] = await Promise.all([
      validate(findSeatByIdSchema, paramId),
      validate(findSeatsSchema, queryParams),
    ]);

    this.logger.info(`Querying seat ${id}`);
    const result = await this.useCase.findById(id, filters);

    return ctx.json({ ...result }, 200);
  }

  async findAll(ctx: Context) {
    this.logger.info("querying slots");
    const queryParams = ctx.req.query();

    const filters = await validate(findSeatsSchema, queryParams);
    const result = await this.useCase.findAll(filters);

    return ctx.json({ ...result }, 200);
  }
}
