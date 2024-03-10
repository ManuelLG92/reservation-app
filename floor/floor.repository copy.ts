import { GenericCrud } from "../common/generic-crud.ts";
import { Floor, FloorPropsOut } from "./floor.entity.ts";

export class FloorRepository extends GenericCrud<FloorPropsOut, Floor> {
  constructor() {
    super(Floor.constructor.name);
  }
}
