import { Company } from "src/company/domain/company.entity.ts";
export interface FindAllArgs {
  startAt?: Date;
  endAt?: Date;
}
export interface CompanyRepository {
  findAll: (data: FindAllArgs) => Promise<Company[]>;
  upsert: (value: Company) => Promise<void>;
}
