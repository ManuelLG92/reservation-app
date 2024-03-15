import { GenericCrud } from "src/common/infrastructure/persistence/generic-crud.ts";
import { SeatRepository } from "src/seat/ports/seat.repository.port.ts";
import { Seat } from "src/seat/domain/seat.entity.ts";
import { NotFoundError } from "src/common/errors/not-found-error.ts";
import { Collection } from "mongo";

export class SeatRepositoryAdapter extends GenericCrud<Seat>
  implements SeatRepository {
  constructor(collection: Collection<Seat>) {
    super(Seat.prototype.constructor.name, collection);
  }
  findByPosition(number: number) {
    const seat = [...this.records.values()].find((it) =>
      it.identifier === `seat-${number}`
    );
    if (!seat) {
      throw new NotFoundError(`Seat ${number} not found.`);
    }
    return Promise.resolve(seat);
  }
}
