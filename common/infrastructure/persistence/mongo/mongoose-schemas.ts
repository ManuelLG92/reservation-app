import { connect, InferSchemaType, model, Schema } from "mongoose";

enum ReservationSchemas {
  Users = "Users",
  Slots = "Slots",
  Seat = "Seats",
  Floors = "Floors",
  Offices = "Offices",
  Companies = "Companies",
}

const BaseSchema = new Schema({
  id: { type: String, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date },
});
export type BaseSchemaType = InferSchemaType<typeof BaseSchema>;
export const BaseModel = model<BaseSchemaType>(
  "BaseSchema",
  BaseSchema,
);

const Companies = new Schema({
  id: { type: String, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date },
  name: { type: String, required: true },
  offices: [{ type: String, ref: ReservationSchemas.Offices }],
});
export type companySchemaType = InferSchemaType<typeof Companies>;
export const companyModel = model<companySchemaType>(
  ReservationSchemas.Companies,
  Companies,
);
const officeSchema = new Schema({
  id: { type: String, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date },
  identifier: { type: String, required: true },
  floors: [{ type: String, ref: ReservationSchemas.Floors }],
});

export type OfficeSchemaType = InferSchemaType<typeof officeSchema>;
export const officeModel = model<OfficeSchemaType>(
  ReservationSchemas.Offices,
  officeSchema,
);
const Floors = new Schema({
  id: { type: String, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date },
  identifier: { type: String, required: true },
  seats: [{ type: String, ref: ReservationSchemas.Seat }],
});
export type FloorSchemaType = InferSchemaType<typeof Floors>;
export const floorModel = model<FloorSchemaType>(
  ReservationSchemas.Floors,
  Floors,
);

const Seat = new Schema({
  id: { type: String, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date },
  identifier: { type: String, required: true },
  slots: [{ type: String, ref: ReservationSchemas.Slots }],
});
export type SeatSchemaType = InferSchemaType<typeof Seat>;
export const SeatModel = model<FloorSchemaType>(ReservationSchemas.Seat, Seat);

const Slots = new Schema({
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

const User = new Schema({
  id: { type: String, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date },
  name: { type: String, required: true },
});

export type UserSchemaType = InferSchemaType<typeof User>;
export const userModel = model<UserSchemaType>(ReservationSchemas.Users, User);

export const initMongoose = async (url: string) => {
  try {
    await connect(url);

    console.log("mongoose connected");
  } catch (error) {
    console.log(
      `Mongoose failed to connected due: ${(error as Error).message}`,
    );
    throw error;
  }
};
