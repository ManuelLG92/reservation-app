import { GenericCrud } from "../../common/persistence/generic-crud.ts";
import { SeatRepository } from "../ports/seat.repository.port.ts";
import { Seat } from "../domain/seat.entity.ts";

export class SeatRepositoryAdapter extends GenericCrud<Seat>
  implements SeatRepository {
  constructor() {
    super(Seat.constructor.name);
  }
  findByPosition(number: number) {
    const seat = [...this.records.values()].find((it) =>
      it.identifier === `seat-${number}`
    );
    if (!seat) {
      throw new Error(`Seat ${number} not found.`);
    }
    return Promise.resolve(seat);
  }
}