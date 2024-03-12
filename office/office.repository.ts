import { GenericCrud } from "../common/persistence/generic-crud.ts";
import { Office, OfficePropsOut } from "./office.entity.ts";

export class OfficeRepository extends GenericCrud<OfficePropsOut, Office> {
  constructor() {
    super(Office.constructor.name);
  }
}
