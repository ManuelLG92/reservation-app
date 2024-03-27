import { Seat, SeatOutputProps } from "src/seat/domain/seat.entity.ts";
import { NotFoundError } from "src/common/errors/not-found-error.ts";
import { Model } from "mongoose";
import { SeatSchemaType } from "./seat.schema.ts";
import { ReservationSchemas } from "../../common/infrastructure/persistence/mongoose/mongoose-connect.ts";
import { SeatRepository } from "src/seat/ports/seat.repository.port.ts";

export interface CommonSearchOptions {
  startAt: Date;
  endAt: Date;
}
export interface FindSeatsOptions extends CommonSearchOptions {
  slots: CommonSearchOptions;
}
export class SeatRepositoryAdapter implements SeatRepository {
  constructor(private readonly model: Model<SeatSchemaType>) {
  }

  private readonly commonPopulate = (
    { startAt, endAt }: CommonSearchOptions,
  ) => ({
    path: "slots",
    model: ReservationSchemas.Slots,
    foreignField: "id",
    where: {
      startAt: { $gte: startAt },
      endAt: { $lte: endAt },
    },
    populate: {
      path: "user",
      model: ReservationSchemas.Users,
      foreignField: "id",
    },
  });
  async findByPosition(number: number, filters: CommonSearchOptions) {
    const seat = await this.model
      .findOne({ identifier: `seat-${number}` })
      .populate(this.commonPopulate(filters))
      .lean();

    if (!seat) {
      throw new NotFoundError(`Seat ${number} not found.`);
    }
    return Seat.fromPrimitives(seat as unknown as SeatOutputProps);
  }

  async findById(id: string, filters: CommonSearchOptions) {
    const seat = await this.model
      .findOne({ _id: id })
      .populate(this.commonPopulate(filters))
      .lean();

    if (!seat) {
      throw new NotFoundError(`Seat ${id} not found.`);
    }
    return Seat.fromPrimitives(seat as unknown as SeatOutputProps);
  }

  async findAll({ slots, startAt, endAt }: FindSeatsOptions) {
    const seat = await this.model
      .find({ startAt: { $gte: startAt }, endAt: { $gte: endAt } })
      .populate(this.commonPopulate(slots))
      .lean() as unknown as SeatOutputProps[];

    const toDomainArray = seat.map((item) =>
      Seat.fromPrimitives(item as unknown as SeatOutputProps)
    );
    return toDomainArray;
  }
  async upsert(value: Seat): Promise<void> {
    await this.model.updateOne(
      { id: value.id },
      { $set: value.toPersistance() },
      { upsert: true },
    );
  }
}
