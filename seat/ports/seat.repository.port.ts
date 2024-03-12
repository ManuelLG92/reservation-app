import { Seat } from "../domain/seat.entity.ts";

export interface SeatRepository {
  findByPosition: (number: number) => Promise<Seat>;
  upsert: (value: Seat) => Promise<void>;
}
