import { GenericCrud } from "../common/persistence/generic-crud.ts";
import { Office } from "./office.entity.ts";

export class OfficeRepository extends GenericCrud<Office> {
  constructor() {
    super(Office.constructor.name);
  }
}
