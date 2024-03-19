import { Seat, SeatOutputProps } from "src/seat/domain/seat.entity.ts";
import { NotFoundError } from "src/common/errors/not-found-error.ts";
import { Model } from "mongoose";
import { SeatSchemaType } from "src/common/infrastructure/persistence/mongoose/schemas/seat.schema.ts";
import { ReservationSchemas } from "src/common/infrastructure/persistence/mongoose/mongoose-schemas.ts";

export class SeatRepositoryAdapter {
  constructor(private readonly model: Model<SeatSchemaType>) {
  }
  async findByPosition(number: number) {
    const seat = await this.model
      .findOne({ identifier: `seat-${number}` })
      .populate({
        path: "slots",
        model: ReservationSchemas.Slots,
        foreignField: "id",
        populate: {
          path: "user",
          model: ReservationSchemas.Users,
          foreignField: "id",
        },
      })
      .lean();

    if (!seat) {
      throw new NotFoundError(`Seat ${number} not found.`);
    }
    return Seat.fromPrimitives(seat as unknown as SeatOutputProps);
  }
  async upsert(value: Seat): Promise<void> {
    await this.model.updateOne(
      { id: value.id },
      { $set: value.toPersistance() },
      { upsert: true },
    );
  }
}
