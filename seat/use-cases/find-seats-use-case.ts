import { LoggerInterface } from "src/common/observability/logger.ts";
import { SeatRepository } from "src/seat/ports/seat.repository.port.ts";

export class FindSeatsUseCase {
  constructor(
    private readonly logger: LoggerInterface,
    private readonly seatRepository: SeatRepository,
  ) {
  }

  async findAll() {
    const seats = await this.seatRepository.findAll();
    this.logger.info(`Found ${seats.length} seats`);
    return seats.map((seat) => seat.toJson());
  }
  async findByPosition(position: number) {
    const seat = await this.seatRepository.findByPosition(position);
    this.logger.info(`Found seat ${seat.id} fro position ${position}`);
    return seat.toJson();
  }

  async findById(id: string) {
    const seat = await this.seatRepository.findById(id);
    this.logger.info(`Found seat ${seat.id} on position ${seat.identifier}`);
    return seat.toJson();
  }
}
