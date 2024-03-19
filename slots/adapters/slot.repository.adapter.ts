import { Slot, SlotOutputProps } from "src/slots/domain/slot.entity.ts";
import { Model } from "mongoose";
import { SlotsSchemaType } from "./slot.schema.ts";
import { SlotRepository } from "src/slots/ports/slot.repository.port.ts";
import { ReservationSchemas } from "../../common/infrastructure/persistence/mongoose/mongoose-connect.ts";
import { NotFoundError } from "src/common/errors/not-found-error.ts";

export class SlotRepositoryAdapter implements SlotRepository {
  constructor(private readonly model: Model<SlotsSchemaType>) {
  }

  async findById(id: string) {
    const slot = await this.model
      .findOne({ _id: id })
      .populate({
        path: "user",
        model: ReservationSchemas.Users,
        foreignField: "id",
      })
      .lean();

    if (!slot) {
      throw new NotFoundError(`Slot ${id} not found.`);
    }
    return Slot.fromPrimitives(slot as unknown as SlotOutputProps);
  }

  async upsert(value: Slot): Promise<void> {
    await this.model.updateOne(
      { _id: value.id },
      { $set: value.toPersistance() },
      { upsert: true },
    );
  }
}
