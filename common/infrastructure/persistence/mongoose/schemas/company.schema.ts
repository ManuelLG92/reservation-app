import { InferSchemaType, model, Schema } from "mongoose";
import { ReservationSchemas } from "src/common/infrastructure/persistence/mongoose/mongoose-schemas.ts";

const Companies = new Schema({
  _id: {
    type: String,
    index: { unique: true },
  },
  id: { type: String, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date },
  name: { type: String, required: true },
  offices: [{ type: String, ref: ReservationSchemas.Offices }],
});
export type companySchemaType = InferSchemaType<typeof Companies>;
export const companyModel = model<companySchemaType>(
  ReservationSchemas.Companies,
  Companies,
);
