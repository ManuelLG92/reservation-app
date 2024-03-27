import { InferSchemaType, Schema } from "mongoose";

export const baseFields = {
  _id: {
    type: String,
    index: { unique: true },
  },
  id: { type: String, required: true, index: { unique: true } },
  createdAt: { type: Date, required: true, index: true },
  updatedAt: { type: Date, index: true },
};
const BaseSchema = new Schema({ ...baseFields }, { _id: false, __v: true });
export type BaseSchemaType = InferSchemaType<typeof BaseSchema>;
