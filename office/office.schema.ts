import { InferSchemaType, model, Schema } from "mongoose";
import { ReservationSchemas } from "../common/infrastructure/persistence/mongoose/mongoose-connect.ts";
import { baseFields } from "src/common/infrastructure/persistence/mongoose/schemas/base.schema.ts";

const officeSchema = new Schema({
  ...baseFields,
  identifier: { type: String, required: true },
  floors: [{ type: String, ref: ReservationSchemas.Floors }],
});

export type OfficeSchemaType = InferSchemaType<typeof officeSchema>;
export const officeModel = model<OfficeSchemaType>(
  ReservationSchemas.Offices,
  officeSchema,
);
