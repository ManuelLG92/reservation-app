import {
  AggregateRoot,
  AggregateRootProps,
  AggregateRootPropsOnCreation,
} from "src/common/domain/entity/aggregate-root.entity.ts";
import { Office, OfficePropsOut } from "src/office/office.entity.ts";
import { BadRequestError } from "src/common/errors/bad-request-error.ts";
import { CompanySchemaType } from "src/company/adapters/company.schema.ts";

export interface CompanyProps extends AggregateRootPropsOnCreation {
  offices: Office[];
  name: string;
}
export interface CompanyPropsOut extends AggregateRootProps {
  name: string;
  offices: OfficePropsOut[];
}

export class Company extends AggregateRoot<CompanyPropsOut, CompanySchemaType> {
  #offices: Office[];
  #name: string;
  constructor({ name, offices, ...father }: CompanyProps) {
    super({ ...father });
    this.#offices = offices;
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
      throw new BadRequestError(
        `Office names should be unique. ${officeName} is already taken`,
      );
    }
    this.offices.push(newOffice);
  }

  bulkAddOffices(offices: Office[]) {
    offices.forEach((office) => {
      this.addOffice(office);
    });
  }

  toJson() {
    return {
      ...this.aggregateRootPrimitives(),
      name: this.name,
      offices: this.#offices.map((it) => it.toJson()),
    };
  }
  toPersistance() {
    return {
      ...this.aggregateRootPrimitives(),
      name: this.name,
      offices: this.#offices.map((it) => it.id),
    };
  }

  static fromPrimitives({ name, offices, ...rest }: CompanyPropsOut) {
    return new Company({
      ...rest,
      name,
      offices: Office.fromPrimitiveCollection(offices),
    });
  }
}
