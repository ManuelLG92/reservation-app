import { InferSchemaType, Schema } from "mongoose";

export const baseFields = {
  _id: {
    type: String,
    index: { unique: true },
  },
  id: { type: String, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date },
};
const BaseSchema = new Schema({ ...baseFields });
export type BaseSchemaType = InferSchemaType<typeof BaseSchema>;
