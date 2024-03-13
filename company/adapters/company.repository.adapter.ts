import { GenericCrud } from "src/common/infrastructure/persistence/generic-crud.ts";
import { Company } from "src/company/domain/company.entity.ts";
import { CompanyRepository } from "src/company/ports/company.repository.port.ts";

export class CompanyRepositoryAdapter extends GenericCrud<Company>
  implements CompanyRepository {
  constructor() {
    super(Company.constructor.name);
  }
}
