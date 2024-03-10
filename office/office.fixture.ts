import { Office } from "./office.entity.ts";

export const officeFixture = (name?: string) => new Office(name ?? "office-1");
