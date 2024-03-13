import { GenericCrud } from "src/common/infrastructure/persistence/generic-crud.ts";
import { Floor } from "src/floor/floor.entity.ts";

export class FloorRepository extends GenericCrud<Floor> {
  constructor() {
    super(Floor.constructor.name);
  }
}
