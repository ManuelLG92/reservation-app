import { Office } from "src/office/office.entity.ts";

export const officeFixture = (name?: string) => new Office(name ?? "office-1");
