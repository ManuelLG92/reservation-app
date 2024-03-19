import { InferSchemaType, model, Schema } from "mongoose";
import { ReservationSchemas } from "src/common/infrastructure/persistence/mongoose/mongoose-schemas.ts";

const seatSchema = new Schema({
  _id: {
    type: String,
    index: { unique: true },
  },
  id: { type: String, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date },
  identifier: { type: String, required: true },
  slots: [{ type: String, ref: ReservationSchemas.Slots }],
});
export type SeatSchemaType = InferSchemaType<typeof seatSchema>;
export const seatModel = model<SeatSchemaType>(
  ReservationSchemas.Seat,
  seatSchema,
);
