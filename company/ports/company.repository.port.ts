import {
  Company,
  CompanyToPersistence,
} from "src/company/domain/company.entity.ts";

export interface CompanyRepository {
  findAll: () => Promise<CompanyToPersistence[]>;
  upsert: (value: Company) => Promise<void>;
}
