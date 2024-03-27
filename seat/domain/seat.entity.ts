import {
  AggregateRoot,
  AggregateRootProps,
  AggregateRootPropsOnCreation,
} from "src/common/domain/entity/aggregate-root.entity.ts";
import { Slot, SlotOutputProps } from "src/slots/domain/slot.entity.ts";
import { NotFoundError } from "src/common/errors/not-found-error.ts";
import { BadRequestError } from "src/common/errors/bad-request-error.ts";
import { SeatSchemaType } from "src/seat/adapter/seat.schema.ts";

// implement in redis with TTL and subscribe to it
const cache: Record<string, Slot> = {};
export interface SeatInputProps extends AggregateRootPropsOnCreation {
  identifier: string;
  slots: Slot[];
}

export interface SeatOutputProps extends AggregateRootProps {
  identifier: string;
  slots: SlotOutputProps[];
}
export interface SeatPersistenceProps extends Omit<SeatOutputProps, "slots"> {
  slots: string[];
}
export class Seat extends AggregateRoot<SeatOutputProps, SeatSchemaType> {
  #identifier: string;
  #slots: Map<string, Slot>;
  constructor({ identifier, slots, ...rest }: SeatInputProps) {
    super(rest);
    this.#identifier = identifier;
    const mapSlots = new Map<string, Slot>();
    slots?.forEach((slot) => {
      mapSlots.set(slot.id, slot);
    });
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
      throw new BadRequestError(
        "Oops. Spot already booked. Choose another seat or change the time frame",
      );
    }
  }

  addDraftSlot(slotRequest: Slot) {
    this.validateSlot(slotRequest);
    slotRequest.draftState();

    // needed to perform updates when expired in cache(eg. redis)
    cache[slotRequest.id] = slotRequest;
    this.#slots.set(slotRequest.id, slotRequest);
    return this;
  }

  confirmSlot(id: string) {
    const slot = this.#slots.get(id);
    if (!slot) {
      throw new NotFoundError(
        `Oops. Spot ${slot} doesn't exist`,
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
      throw new NotFoundError(`Slot ${id} not exists`);
    }
  }

  toJson() {
    return {
      ...this.aggregateRootPrimitives(),
      identifier: this.identifier,
      slots: this.slots.map((slot) => slot.toJson()),
    };
  }
  toPersistance() {
    return {
      ...this.aggregateRootPrimitives(),
      identifier: this.identifier,
      slots: this.slots.map((slot) => slot.id),
    };
  }

  static fromPrimitives({ identifier, slots, ...rest }: SeatOutputProps) {
    return new Seat({
      ...rest,
      slots: Slot.fromPrimitiveCollection(slots ?? []),
      identifier,
    });
  }

  static fromPrimitiveCollection(data: SeatOutputProps[]) {
    return data.map((item) => Seat.fromPrimitives(item));
  }
}
