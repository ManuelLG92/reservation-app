import { InferSchemaType, model, Schema } from "mongoose";
import { ReservationSchemas } from "src/common/infrastructure/persistence/mongoose/mongoose-schemas.ts";

const floorsSchema = new Schema({
  _id: {
    type: String,
    index: { unique: true },
  },
  id: { type: String, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date },
  identifier: { type: String, required: true },
  seats: [{ type: String, ref: ReservationSchemas.Seat }],
});
export type FloorSchemaType = InferSchemaType<typeof floorsSchema>;
export const floorModel = model<FloorSchemaType>(
  ReservationSchemas.Floors,
  floorsSchema,
);
