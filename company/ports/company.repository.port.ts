import { Company } from "src/company/domain/company.entity.ts";

export interface CompanyRepository {
  findAll: () => Promise<Company[]>;
  upsert: (value: Company) => Promise<void>;
}
