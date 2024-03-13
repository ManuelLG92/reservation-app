import { GenericCrud } from "src/common/infrastructure/persistence/generic-crud.ts";
import { Office } from "src/office/office.entity.ts";

export class OfficeRepository extends GenericCrud<Office> {
  constructor() {
    super(Office.constructor.name);
  }
}
