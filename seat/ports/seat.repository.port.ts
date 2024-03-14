import { Seat } from "src/seat/domain/seat.entity.ts";

export interface SeatRepository {
  findByPosition: (number: number) => Promise<Seat>;
  findById: (id: string) => Promise<Seat>;
  findAll: () => Promise<Seat[]>;
  upsert: (value: Seat) => Promise<void>;
}
