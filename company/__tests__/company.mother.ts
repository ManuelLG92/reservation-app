import { Office } from "../../office/office.entity.ts";
import { Company } from "../domain/company.entity.ts";

export class CompanyMother {
  private offices: Office[] = [];
  private name = "company-mother";

  static init() {
    return new CompanyMother();
  }
  setName(name: string) {
    this.name = name;
    return this;
  }

  setOffices(offices: Office[]) {
    this.offices = offices;
    return this;
  }

  build() {
    const company = new Company(
      this.name,
    );

    company.bulkAddOffices(this.offices);
    return company;
  }
}
