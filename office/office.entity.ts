import {
  AggregateRoot,
  AggregateRootProps,
} from "../common/aggregate-root.entity.ts";
import { Floor, FloorPropsOut } from "../floor/floor.entity.ts";

export interface OfficeProps extends AggregateRootProps {
  name: string;
  floors: Floor[];
}

export interface OfficePropsOut extends AggregateRootProps {
  name: string;
  floors: FloorPropsOut[];
}
export class Office extends AggregateRoot<OfficePropsOut> {
  #name: string;
  #floors: Floor[];
  constructor(name: string) {
    super();
    this.#name = name;
    this.#floors = [];
  }

  get name(): string {
    return this.#name;
  }
  get floors(): Floor[] {
    return this.#floors;
  }

  addFloor(newFloor: Floor) {
    const newFloorIdentifier = newFloor.identifier;
    const hasIdenfitierOverlap = this.floors.find((floor) =>
      floor.identifier.toLowerCase() === newFloorIdentifier.toLowerCase()
    );
    if (hasIdenfitierOverlap) {
      throw new Error(
        `Floor identier should be unique. ${newFloorIdentifier} is already taken`,
      );
    }
    this.floors.push(newFloor);
  }

  toJson(): OfficePropsOut {
    return {
      ...this.aggregateRootPrimitives(),
      name: this.name,
      floors: this.floors.map((floor) => floor.toJson()),
    };
  }
}
