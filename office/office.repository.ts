import { Model } from "mongoose";
import { OfficeSchemaType } from "./office.schema.ts";

export class OfficeRepository {
  constructor(private readonly collection: Model<OfficeSchemaType>) {
  }
}
