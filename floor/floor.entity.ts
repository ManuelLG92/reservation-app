import {
  AggregateRoot,
  AggregateRootOutProps,
  AggregateRootProps,
} from "src/common/domain/entity/aggregate-root.entity.ts";
import { Seat, SeatOutputProps } from "src/seat/domain/seat.entity.ts";
import { BadRequestError } from "src/common/errors/bad-request-error.ts";
export interface FloorProps extends AggregateRootProps {
  identifier: string;
  seats: Seat[];
}

export interface FloorPropsOut extends AggregateRootOutProps {
  identifier: string;
  seats: SeatOutputProps[];
}
export interface FloorToPersistenceProps extends AggregateRootOutProps {
  identifier: string;
  seats: string[];
}
export class Floor
  extends AggregateRoot<FloorPropsOut, FloorToPersistenceProps> {
  #identifier: string;
  #seats: Seat[];
  constructor({ identifier, seats, ...father }: FloorProps) {
    super(father);
    this.#identifier = identifier;
    this.#seats = seats ?? [];
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
      throw new BadRequestError(
        `Seats identifier should be unique. Identifier ${newIdentifier} already exists.`,
      );
    }
    this.seats.push(newSeat);
  }

  addBulkSeats(seats: Seat[]) {
    seats.forEach((seat) => {
      this.addSeat(seat);
    });
  }
  toJson(): FloorPropsOut {
    return {
      ...this.aggregateRootPrimitives(),
      identifier: this.identifier,
      seats: this.seats.map((it) => it.toJson()),
    };
  }

  toPersistance(): FloorToPersistenceProps {
    return {
      ...this.aggregateRootPrimitives(),
      identifier: this.identifier,
      seats: this.seats.map((it) => it.id),
    };
  }

  static fromPrimitives({ identifier, seats, ...rest }: FloorPropsOut) {
    return new Floor({
      ...AggregateRoot.convertOutputToInput(rest),
      identifier,
      seats: Seat.fromPrimitiveCollection(seats),
    });
  }

  static fromPrimitiveCollection(data: FloorPropsOut[]) {
    return data.map((item) => Floor.fromPrimitives(item));
  }
}
