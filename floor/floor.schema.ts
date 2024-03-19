import { InferSchemaType, model, Schema } from "mongoose";
import { ReservationSchemas } from "../common/infrastructure/persistence/mongoose/mongoose-connect.ts";
import { baseFields } from "src/common/infrastructure/persistence/mongoose/schemas/base.schema.ts";

const floorsSchema = new Schema({
  ...baseFields,
  identifier: { type: String, required: true },
  seats: [{ type: String, ref: ReservationSchemas.Seat }],
});
export type FloorSchemaType = InferSchemaType<typeof floorsSchema>;
export const floorModel = model<FloorSchemaType>(
  ReservationSchemas.Floors,
  floorsSchema,
);
