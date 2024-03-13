import {
  AggregateRoot,
  AggregateRootProps,
} from "src/common/domain/entity/aggregate-root.entity.ts";
import { Slot, SlotOutputProps } from "src/slots/domain/slot.entity.ts";

// implement in redis with TTL and subscribe to it
const cache: Record<string, Slot> = {};
export interface SeatInputProps {
  identifier: string;
}

export interface SeatOutputProps extends AggregateRootProps {
  identifier: string;
  slots: SlotOutputProps[];
}
export class Seat extends AggregateRoot<SeatOutputProps> {
  #identifier: string;
  #slots: Map<string, Slot>;
  constructor({ identifier }: SeatInputProps) {
    super();
    this.#identifier = identifier;
    const mapSlots = new Map<string, Slot>();
    this.#slots = mapSlots;
  }

  get identifier(): string {
    return this.#identifier;
  }
  get slots(): Slot[] {
    return [...this.#slots.values()];
  }

  validateSlot(slotRequest: Slot) {
    const startAt = slotRequest.startAt;
    const endAt = slotRequest.endAt;
    const hasOverlappingSlot = !!this.slots.find((slot) =>
      startAt < slot.endAt && endAt > slot.startAt
    );
    if (hasOverlappingSlot) {
      throw new Error(
        "Opps. Spot already booked. Choose another seat or change the timeframe",
      );
    }
  }

  addDraftSlot(slotRequest: Slot) {
    this.validateSlot(slotRequest);
    slotRequest.draftState();
    // needed to perform updated when expired in cache(redis)
    cache[slotRequest.id] = slotRequest;
    this.#slots.set(slotRequest.id, slotRequest);
    return this;
  }

  confirmSlot(id: string) {
    const slot = this.#slots.get(id);
    if (!slot) {
      throw new Error(
        `Opps. Spot ${slot} doesn't exist`,
      );
    }
    slot.confirmState();
    this.#slots.set(id, slot);
    delete cache[id];
    return this;
  }

  deleteSlotByIdDueTTLNotification(id: string) {
    const slot = this.#slots.get("id");
    if (slot?.isDraft()) {
      this.deleteSlotById(id);
    }
  }

  deleteSlotById(id: string) {
    const isDeleted = this.#slots.delete(id);
    if (!isDeleted) {
      throw new Error(`Slot ${id} not exists`);
    }
  }

  toJson() {
    return {
      ...this.aggregateRootPrimitives(),
      identifier: this.identifier,
      slots: this.slots.map((slot) => slot.toJson()),
    };
  }
}
