import { LoggerInterface } from "src/common/observability/logger.ts";
import { Slot } from "src/slots/domain/slot.entity.ts";
import { SlotRepository } from "src/slots/ports/slot.repository.port.ts";
import { UserRepository } from "src/user/user.repository.ts";
import { SeatRepository } from "src/seat/ports/seat.repository.port.ts";
import { bookSeatSlotDto } from "src/seat/router/controller/book-seats/book-seats.schema.ts";

export class BookSeatUseCase {
  constructor(
    private readonly logger: LoggerInterface,
    private readonly seatRepository: SeatRepository,
    private readonly userRepository: UserRepository,
    private readonly slotRepository: SlotRepository,
  ) {
  }

  async bookSlotDraft({ startAt, seatId, userId, endAt }: bookSeatSlotDto) {
    const [seat, user] = await Promise.all([
      this.seatRepository.findByPosition(seatId),
      this.userRepository.findById(userId),
    ]);
    this.logger.info(`seat ID booked in draft status with id: ${seat.id}`);
    const slot = new Slot({ startAt, endAt, user });
    seat.addDraftSlot(slot);
    await this.slotRepository.upsert(slot);
    this.logger.info(`Sloot booked in draft status with id: ${slot.id}`);
    await this.seatRepository.upsert(seat)
    return this.bookMapper(slot);
  }

  async confirmSlot(id: string) {
    const slot = await this.slotRepository.findById(id);
    slot.confirmState();
    this.logger.info(`Sloot ${slot.id} confirmed.`);
    return this.bookMapper(slot);
  }

  private bookMapper(slot: Slot) {
    return {
      slotId: slot.id,
      state: slot.state,
    };
  }
}
