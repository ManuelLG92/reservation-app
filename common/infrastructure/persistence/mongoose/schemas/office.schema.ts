import { InferSchemaType, model, Schema } from "mongoose";
import { ReservationSchemas } from "src/common/infrastructure/persistence/mongoose/mongoose-schemas.ts";

const officeSchema = new Schema({
  _id: {
    type: String,
    index: { unique: true },
  },
  id: { type: String, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date },
  identifier: { type: String, required: true },
  floors: [{ type: String, ref: ReservationSchemas.Floors }],
});

export type OfficeSchemaType = InferSchemaType<typeof officeSchema>;
export const officeModel = model<OfficeSchemaType>(
  ReservationSchemas.Offices,
  officeSchema,
);
