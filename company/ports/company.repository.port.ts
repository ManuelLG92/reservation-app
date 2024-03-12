import { Company } from "../domain/company.entity.ts";

export interface CompanyRepository {
  findAll: () => Promise<Company[]>;
  upsert: (value: Company) => Promise<void>;
}
