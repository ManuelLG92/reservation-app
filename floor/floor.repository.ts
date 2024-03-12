import { GenericCrud } from "../common/persistence/generic-crud.ts";
import { Floor } from "./floor.entity.ts";

export class FloorRepository extends GenericCrud<Floor> {
  constructor() {
    super(Floor.constructor.name);
  }
}
