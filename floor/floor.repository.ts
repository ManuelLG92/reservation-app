import { Model } from "mongoose";
import { FloorSchemaType } from "src/common/infrastructure/persistence/mongo/mongoose-schemas.ts";
import { GenericCrudV2 } from "src/common/infrastructure/persistence/generic-crud-v2.ts";

export class FloorRepository extends GenericCrudV2<FloorSchemaType> {
  constructor(collection: Model<FloorSchemaType>) {
    super("Floor", collection);
  }
}
