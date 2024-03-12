import { assertInstanceOf, assertStrictEquals } from "asserts";
import { beforeEach, describe, it } from "test";
import { Company } from "../domain/company.entity.ts";
import { CompanyMother } from "./company.mother.ts";

describe("#Company", () => {
  let companyMother: CompanyMother;
  beforeEach(() => {
    companyMother = CompanyMother.init();
  });
  it("Should create a company", () => {
    const company = companyMother.setName("my name").build();
    assertStrictEquals("my name", company.name);
    assertInstanceOf(company, Company);
  });
});
