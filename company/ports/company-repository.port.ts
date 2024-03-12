import { CompanyPropsOut } from "../domain/company.entity.ts";

export interface CompanyRepository {
  findAll: () => Promise<CompanyPropsOut[]>;
}
