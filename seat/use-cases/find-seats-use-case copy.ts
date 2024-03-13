import { LoggerInterface } from "src/common/observability/logger.ts";
import { SeatRepository } from "src/seat/ports/seat.repository.port.ts";

export class GetSeatUseCase {
  constructor(
    private readonly logger: LoggerInterface,
    private readonly seatRepository: SeatRepository,
  ) {
  }

  async getAll() {
    const seats = await this.seatRepository.findAll();
    this.logger.info(`Found ${seats.length} seats`);
    return seats.map((seat) => seat.toJson());
  }
  async getByPosition(position: number) {
    const seat = await this.seatRepository.findByPosition(position);
    this.logger.info(`Found seat ${seat.id} fro position ${position}`);
    return seat.toJson();
  }
}
