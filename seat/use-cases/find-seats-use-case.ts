import { LoggerInterface } from "src/common/observability/logger.ts";
import { SeatRepository } from "src/seat/ports/seat.repository.port.ts";
import {
  differenceInDays,
  isAfter,
  isBefore,
  subDays,
} from "date-fns";
import {
  CommonSearchOptions,
} from "src/seat/adapter/seat.repository.adapter.ts";

export interface FindAllNestedPartial extends CommonSearchOptions {
  slots: Partial<CommonSearchOptions>;

}
export class FindSeatsUseCase {
  constructor(
    private readonly logger: LoggerInterface,
    private readonly seatRepository: SeatRepository,
  ) {
  }

  private readonly MAX_SLOT_DAYS = 7;

  async findAll(options: Partial<FindAllNestedPartial>) {
    const slotFilters = this.validateFilters(options?.slots ?? {});
    const seatFilters = this.validateFilters(options);
    const seats = await this.seatRepository.findAll(
      { slots: slotFilters, ...seatFilters },
    );
    this.logger.info(`Found ${seats.length} seats`);
    return seats.map((seat) => seat.toJson());
  }

  async findByPosition(
    position: number,
    options: Partial<CommonSearchOptions>,
  ) {
    const filters = this.validateFilters(options);
    const seat = await this.seatRepository.findByPosition(position, filters);
    this.logger.info(`Found seat ${seat.id} for position ${position}`);
    return seat.toJson();
  }

  async findById(id: string, options: Partial<CommonSearchOptions>) {
    const filters = this.validateFilters(options);
    const seat = await this.seatRepository.findById(id, filters);
    this.logger.info(`Found seat ${seat.id} on position ${seat.identifier}`);
    return seat.toJson();
  }

  private validateFilters(
    options: Partial<CommonSearchOptions>,
  ): Required<CommonSearchOptions> {
    const now = new Date();
    const { startAt, endAt } = options;

    this.validateFiltersError(options, now);

    if (startAt && !endAt) {
      return {
        startAt,
        endAt: now,
      };
    }
    if (!startAt && endAt) {
      return {
        startAt: subDays(endAt, this.MAX_SLOT_DAYS),
        endAt: endAt,
      };
    }

    if (startAt && endAt) {
      return {
        startAt,
        endAt,
      };
    }
    return {
      startAt: subDays(now, this.MAX_SLOT_DAYS),
      endAt: now,
    };
  }

  private validateFiltersError(
    options: Partial<CommonSearchOptions>,
    now: Date,
  ) {
    const { startAt, endAt } = options;

    if (startAt && endAt && startAt > endAt) {
      throw new Error("startAt cannot be later than endAt");
    }

    if (
      startAt && endAt && differenceInDays(endAt, startAt) > this.MAX_SLOT_DAYS
    ) {
      throw new Error(`The maximum slot days is ${this.MAX_SLOT_DAYS}`);
    }
    if (startAt && isBefore(startAt, now)) {
      throw new Error("startAt cannot be in the past");
    }

    if (endAt && isAfter(endAt, now)) {
      throw new Error("endAt cannot a future date");
    }
  }
}
