import { GenericCrud } from "../../common/persistence/generic-crud.ts";
import { Company, CompanyPropsOut } from "../domain/company.entity.ts";
import { CompanyRepository } from "../ports/company-repository.port.ts";

export class CompanyRepositoryAdapter
  extends GenericCrud<CompanyPropsOut, Company>
  implements CompanyRepository {
  constructor() {
    super(Company.constructor.name);
  }
}
