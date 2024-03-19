import { InferSchemaType, model, Schema } from "mongoose";
import { ReservationSchemas } from "../../common/infrastructure/persistence/mongoose/mongoose-connect.ts";
import { baseFields } from "src/common/infrastructure/persistence/mongoose/schemas/base.schema.ts";

const seatSchema = new Schema({
  ...baseFields,
  identifier: { type: String, required: true },
  slots: [{ type: String, ref: ReservationSchemas.Slots }],
});
export type SeatSchemaType = InferSchemaType<typeof seatSchema>;
export const seatModel = model<SeatSchemaType>(
  ReservationSchemas.Seat,
  seatSchema,
);
