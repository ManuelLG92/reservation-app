import { InferSchemaType, model, Schema } from "mongoose";
import { ReservationSchemas } from "../common/infrastructure/persistence/mongoose/mongoose-connect.ts";
import { baseFields } from "src/common/infrastructure/persistence/mongoose/schemas/base.schema.ts";

const User = new Schema({
  ...baseFields,
  name: { type: String, required: true },
});

export type UserSchemaType = InferSchemaType<typeof User>;
export const userModel = model<UserSchemaType>(ReservationSchemas.Users, User);
