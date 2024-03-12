import { Slot } from "../domain/slot.entity.ts";

export interface SlotRepository {
  upsert: (value: Slot) => Promise<void>;
}
