import { GenericCrud } from "src/common/infrastructure/persistence/generic-crud.ts";
import { Office } from "src/office/office.entity.ts";
import { Collection } from "mongo";

export class OfficeRepository extends GenericCrud<Office> {
  constructor(collection: Collection<Office>) {
    super(Office.prototype.constructor.name, collection);
  }
}
