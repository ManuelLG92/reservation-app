import { Seat } from "./seat.entity.ts";

export const seatFixture = (name?: string) =>
  new Seat({ identifier: name ?? "seat-1" });
