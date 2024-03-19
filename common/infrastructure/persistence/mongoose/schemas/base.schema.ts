import { InferSchemaType, Schema } from "mongoose";

const BaseSchema = new Schema({
  _id: {
    type: String,
    index: { unique: true },
  },
  id: { type: String, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date },
});
export type BaseSchemaType = InferSchemaType<typeof BaseSchema>;
