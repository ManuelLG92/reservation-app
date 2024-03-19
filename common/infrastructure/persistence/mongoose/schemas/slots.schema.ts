import { InferSchemaType, model, Schema } from "mongoose";
import { ReservationSchemas } from "src/common/infrastructure/persistence/mongoose/mongoose-schemas.ts";

const Slots = new Schema({
  _id: {
    type: String,
    index: { unique: true },
  },
  id: { type: String, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date },
  state: { type: String, required: true },
  startAt: { type: Date, required: true },
  endAt: { type: Date, required: true },
  user: { type: String, ref: ReservationSchemas.Users },
});
export type SlotsSchemaType = InferSchemaType<typeof Slots>;
export const slotModel = model<SlotsSchemaType>(
  ReservationSchemas.Slots,
  Slots,
);
