import {
  AggregateRoot,
  AggregateRootProps,
} from "../common/aggregate-root.entity.ts";
import { Seat, SeatOutputProps } from "../seat/seat.entity.ts";
export interface FloorProps extends AggregateRootProps {
  identifier: string;
  seats: Seat[];
}

export interface FloorPropsOut extends AggregateRootProps {
  identifier: string;
  seats: SeatOutputProps[];
}
export class Floor extends AggregateRoot<FloorPropsOut> {
  #identifier: string;
  #seats: Seat[];
  constructor(identifier: string) {
    super();
    this.#identifier = identifier;
    this.#seats = [];
  }

  get identifier(): string {
    return this.#identifier;
  }
  get seats(): Seat[] {
    return this.#seats;
  }

  addSeat(newSeat: Seat) {
    const newIdentifier = newSeat.identifier;
    const hasOverlapIdentifier = this.seats.find((seat) =>
      seat.identifier === newIdentifier
    );
    if (hasOverlapIdentifier) {
      throw new Error(
        `Seast identifier should be unique. Identifier ${newIdentifier} already exists.`,
      );
    }
    this.seats.push(newSeat);
  }
  toJson(): FloorPropsOut {
    return {
      ...this.aggregateRootPrimitives(),
      identifier: this.identifier,
      seats: this.seats.map((it) => it.toJson()),
    };
  }
}
