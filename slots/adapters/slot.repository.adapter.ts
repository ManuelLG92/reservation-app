import { Slot } from "src/slots/domain/slot.entity.ts";
import { Model } from "mongoose";
import { SlotsSchemaType } from "src/common/infrastructure/persistence/mongoose/schemas/slots.schema.ts";

export class SlotRepositoryAdapter {
  constructor(private readonly model: Model<SlotsSchemaType>) {
  }

  async upsert(value: Slot): Promise<void> {
    await this.model.updateOne(
      { _id: value.id },
      { $set: value.toPersistance() },
      { upsert: true },
    );
  }
}
