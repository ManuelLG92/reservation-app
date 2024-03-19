import { InferSchemaType, model, Schema } from "mongoose";
import { ReservationSchemas } from "../../common/infrastructure/persistence/mongoose/mongoose-connect.ts";
import { baseFields } from "src/common/infrastructure/persistence/mongoose/schemas/base.schema.ts";

const Slots = new Schema({
  ...baseFields,
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
