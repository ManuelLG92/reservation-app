import { Seat } from "src/seat/domain/seat.entity.ts";
import {
  CommonSearchOptions,
  FindSeatsOptions,
} from "src/seat/adapter/seat.repository.adapter.ts";

export interface SeatRepository {
  findByPosition: (
    number: number,
    filters: CommonSearchOptions,
  ) => Promise<Seat>;
  findById: (id: string, filters: CommonSearchOptions) => Promise<Seat>;
  findAll: (filters: FindSeatsOptions) => Promise<Seat[]>;
  upsert: (value: Seat) => Promise<void>;
}
