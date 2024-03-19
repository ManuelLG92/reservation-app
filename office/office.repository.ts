import { Model } from "mongoose";
import { OfficeSchemaType } from "src/common/infrastructure/persistence/mongoose/schemas/office.schema.ts";
import { GenericCrudV2 } from "src/common/infrastructure/persistence/generic-crud-v2.ts";

export class OfficeRepository extends GenericCrudV2<OfficeSchemaType> {
  constructor(collection: Model<OfficeSchemaType>) {
    super(collection);
  }
}
