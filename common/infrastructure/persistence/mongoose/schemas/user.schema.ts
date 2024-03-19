import { InferSchemaType, model, Schema } from "mongoose";
import { ReservationSchemas } from "src/common/infrastructure/persistence/mongoose/mongoose-schemas.ts";

const User = new Schema({
  _id: {
    type: String,
    index: { unique: true },
  },
  id: { type: String, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date },
  name: { type: String, required: true },
});

export type UserSchemaType = InferSchemaType<typeof User>;
export const userModel = model<UserSchemaType>(ReservationSchemas.Users, User);
