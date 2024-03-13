import { Slot } from "src/slots/domain/slot.entity.ts";

export interface SlotRepository {
  upsert: (value: Slot) => Promise<void>;
  findById: (value: string) => Promise<Slot>;
}
