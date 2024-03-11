import { GenericCrud } from "../common/persistence/generic-crud.ts";
import { Seat, SeatOutputProps } from "./seat.entity.ts";

export class SeatRepository extends GenericCrud<SeatOutputProps, Seat> {
  constructor() {
    super(Seat.constructor.name);
  }
}
