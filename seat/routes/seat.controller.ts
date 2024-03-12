import { Context } from "oak";
import { LoggerInterface } from "../../common/observability/logger.ts";
import { SeatRepository } from "../ports/seat.repository.port.ts";
import { validate } from "../../common/validator/validator.ts";
import { bookSeatSlotSchema } from "./seat.schema.ts";
import { UserRepository } from "../../user/user.repository.ts";
import { Slot } from "../../slots/domain/slot.entity.ts";

export class SeatController {
  constructor(
    private readonly logger: LoggerInterface,
    private readonly seatRepository: SeatRepository,
    private readonly userRepository: UserRepository,
  ) {
    this.bookDraftSlot = this.bookDraftSlot.bind(this);
  }

  async bookDraftSlot(ctx: Context) {
    this.logger.info("Booking a slot");
    const body = await ctx.request.body.json();
    const { from, seat_id, to, user_id } = validate(bookSeatSlotSchema, body);
    const seat = await this.seatRepository.findByPosition(seat_id);
    const user = await this.userRepository.findById(user_id);
    const slot = new Slot({ startAt: from, endAt: to, user });
    seat.addDraftSlot(slot);
    this.logger.info(`Sloot booked in draft status with id: ${slot.id}`);
    ctx.response.body = { slot_id: slot.id, status: slot.state };
    ctx.response.status = 200;
  }
}
