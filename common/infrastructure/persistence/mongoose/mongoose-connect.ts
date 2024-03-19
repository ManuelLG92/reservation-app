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
    await connect(url);
    console.log("mongoose connected");
  } catch (error) {
    console.log(
      `Mongoose failed to connected due: ${(error as Error).message}`,
    );
    throw error;
  }
};
