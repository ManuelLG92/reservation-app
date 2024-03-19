import { InferSchemaType, model, Schema } from "mongoose";
import { ReservationSchemas } from "../../common/infrastructure/persistence/mongoose/mongoose-connect.ts";
import { baseFields } from "src/common/infrastructure/persistence/mongoose/schemas/base.schema.ts";

const Companies = new Schema({
  ...baseFields,
  name: { type: String, required: true },
  offices: [{ type: String, ref: ReservationSchemas.Offices }],
});
export type CompanySchemaType = InferSchemaType<typeof Companies>;
export const companyModel = model<CompanySchemaType>(
  ReservationSchemas.Companies,
  Companies,
);
