import { GenericCrud } from "src/common/infrastructure/persistence/generic-crud.ts";
import { Floor } from "src/floor/floor.entity.ts";
import { Collection } from "mongo";

export class FloorRepository extends GenericCrud<Floor> {
  constructor(collection: Collection<Floor>) {
    super(Floor.prototype.constructor.name, collection);
  }
}
