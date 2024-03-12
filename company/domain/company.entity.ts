import {
  AggregateRoot,
  AggregateRootProps,
} from "../../common/entity/aggregate-root.entity.ts";
import { Office, OfficePropsOut } from "../../office/office.entity.ts";

export interface CompanyProps extends AggregateRootProps {
  offices: Office[];
  name: string;
}
export interface CompanyPropsOut extends AggregateRootProps {
  offices: OfficePropsOut[];
  name: string;
}
export class Company extends AggregateRoot<CompanyPropsOut> {
  #offices: Office[];
  #name: string;
  constructor(name: string) {
    super();
    this.#offices = [];
    this.#name = name;
  }

  get offices(): Office[] {
    return this.#offices;
  }
  get name(): string {
    return this.#name;
  }

  addOffice(newOffice: Office) {
    const officeName = newOffice.name;
    const hasNameOverlap = !!this.offices.find((office) =>
      office.name.toLowerCase() === officeName.toLowerCase()
    );
    if (hasNameOverlap) {
      throw new Error(
        `Office names should be unique. ${officeName} is already taken`,
      );
    }
    this.offices.push(newOffice);
  }

  toJson() {
    return {
      ...this.aggregateRootPrimitives(),
      name: this.name,
      offices: this.#offices.map((it) => it.toJson()),
    };
  }
}
