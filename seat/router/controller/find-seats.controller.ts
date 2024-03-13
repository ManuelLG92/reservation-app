import { Context } from "oak";
import { LoggerInterface } from "src/common/observability/logger.ts";
import { validate } from "src/common/infrastructure/validator/validator.ts";
import { BookSeatUseCase } from "src/seat/use-cases/book-seats-use-case.ts";
import { bookSeatSlotSchema } from "src/seat/router/controller/book-seats/book-seats.schema.ts";

export class FindSeatsUseCase {
  constructor(
    private readonly logger: LoggerInterface,
    private readonly useCase: BookSeatUseCase,
  ) {
    this.bookDraftSlotHandler = this.bookDraftSlotHandler.bind(this);
  }

  async bookDraftSlotHandler(ctx: Context) {
    this.logger.info("Booking a slot");
    const body = await ctx.request.body.json();
    const dto = validate(
      bookSeatSlotSchema,
      body,
    );
    const response = await this.useCase.bookSlotDraft(dto);
    ctx.response.body = { slot_id: response.slotId, status: response.state };
    ctx.response.status = 200;
  }
}
