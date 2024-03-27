import {
  AggregateRoot,
  AggregateRootProps,
  AggregateRootPropsOnCreation,
} from "src/common/domain/entity/aggregate-root.entity.ts";
import { Floor, FloorPropsOut } from "src/floor/floor.entity.ts";
import { BadRequestError } from "src/common/errors/bad-request-error.ts";
import { OfficeSchemaType } from "src/office/office.schema.ts";

export interface OfficeProps extends AggregateRootPropsOnCreation {
  name: string;
  floors: Floor[];
}

export interface OfficePropsOut extends AggregateRootProps {
  name: string;
  floors: FloorPropsOut[];
}

export class Office extends AggregateRoot<OfficePropsOut, OfficeSchemaType> {
  #name: string;
  #floors: Floor[];
  constructor({ name, floors, ...father }: OfficeProps) {
    super(father);
    this.#name = name;
    this.#floors = floors ?? [];
  }

  get name(): string {
    return this.#name;
  }
  get floors(): Floor[] {
    return this.#floors;
  }

  addFloor(newFloor: Floor) {
    const newFloorIdentifier = newFloor.identifier;
    const hasIdentifierOverlap = this.floors.find((floor) =>
      floor.identifier.toLowerCase() === newFloorIdentifier.toLowerCase()
    );
    if (hasIdentifierOverlap) {
      throw new BadRequestError(
        `Floor identifier should be unique. ${newFloorIdentifier} is already taken`,
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
  toPersistance() {
    return {
      ...this.aggregateRootPrimitives(),
      name: this.name,
      floors: this.floors.map((floor) => floor.id),
    };
  }

  static fromPrimitives({ name, floors, ...rest }: OfficePropsOut) {
    return new Office({
      ...rest,
      name,
      floors: Floor.fromPrimitiveCollection(floors),
    });
  }

  static fromPrimitiveCollection(data: OfficePropsOut[]) {
    return data.map((item) => Office.fromPrimitives(item));
  }
}
