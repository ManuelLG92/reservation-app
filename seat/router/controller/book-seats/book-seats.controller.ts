import { BookSeatUseCase } from "src/seat/use-cases/book-seats-use-case.ts";
import { LoggerInterface } from "src/common/observability/logger.ts";
import { bookSeatSlotSchema } from "src/seat/router/controller/book-seats/book-seats.schema.ts";
import { validate } from "src/common/infrastructure/validator/validator.ts";
import { Context } from "hono";
import { httpStatusCodes } from "src/common/errors/http-status-codes.ts";

export class BookSeatController {
  constructor(
    private readonly logger: LoggerInterface,
    private readonly useCase: BookSeatUseCase,
  ) {
    this.bookDraftSlotHandler = this.bookDraftSlotHandler.bind(this);
  }

  async bookDraftSlotHandler(ctx: Context) {
    this.logger.info("Booking a slot");
    const body = await ctx.req.json();
    this.logger.info(`Payload ${JSON.stringify(body)}`);
    const dto = await validate(
      bookSeatSlotSchema,
      body,
    );
    const response = await this.useCase.bookSlotDraft(dto);
    return ctx.json(
      { slot_id: response.slotId, status: response.state },
      httpStatusCodes.OK,
    );
  }
}
