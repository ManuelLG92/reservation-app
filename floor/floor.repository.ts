import { Model } from "mongoose";
import { FloorSchemaType } from "./floor.schema.ts";
import { Floor } from "src/floor/floor.entity.ts";

export class FloorRepository {
  constructor(private readonly model: Model<FloorSchemaType>) {
  }

  async upsert(value: Floor): Promise<void> {
    await this.model.updateOne(
      { id: value.id },
      { $set: value.toPersistance() },
      { upsert: true },
    );
  }
}
