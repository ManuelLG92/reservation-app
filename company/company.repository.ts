import { GenericCrud } from "../common/generic-crud.ts";
import { Company, CompanyPropsOut } from "./company.entity.ts";

export class CompanyRepository extends GenericCrud<CompanyPropsOut, Company> {
  constructor() {
    super(Company.constructor.name);
  }
}
