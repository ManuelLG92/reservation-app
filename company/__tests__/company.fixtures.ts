import { Company } from "../domain/company.entity.ts";

export const companyFixture = (name?: string) =>
  new Company({ name: name ?? "My company LSD", offices: [] });
