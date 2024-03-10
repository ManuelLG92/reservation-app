import { Company } from "./company.entity.ts";

export const companyFixture = (name?: string) =>
  new Company(name ?? "My company LSD");
