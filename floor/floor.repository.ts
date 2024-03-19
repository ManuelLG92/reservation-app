import { Model } from "mongoose";
import { FloorSchemaType } from "./floor.schema.ts";

export class FloorRepository {
  constructor(private readonly collection: Model<FloorSchemaType>) {
  }
}
