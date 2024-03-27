import { connect } from "mongoose";

export enum ReservationSchemas {
  Users = "Users",
  Slots = "Slots",
  Seat = "Seats",
  Floors = "Floors",
  Offices = "Offices",
  Companies = "Companies",
}

export const initMongoose = async (url: string) => {
  try {
    const mongoose = await connect(url);
    mongoose.set("debug", { shell: true });
    console.log("mongoose connected");
  } catch (error) {
    console.log(
      `Mongoose failed to connected due: ${(error as Error).message}`,
    );
    throw error;
  }
};
