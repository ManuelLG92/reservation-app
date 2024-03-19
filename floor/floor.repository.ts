import { Model } from "mongoose";
import { GenericCrudV2 } from "src/common/infrastructure/persistence/generic-crud-v2.ts";
import { FloorSchemaType } from "../common/infrastructure/persistence/mongoose/schemas/floor.schema.ts";

export class FloorRepository extends GenericCrudV2<FloorSchemaType> {
  constructor(collection: Model<FloorSchemaType>) {
    super(collection);
  }
}
