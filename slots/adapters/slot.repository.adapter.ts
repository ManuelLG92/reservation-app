import { GenericCrud } from "src/common/infrastructure/persistence/generic-crud.ts";
import { SlotRepository } from "src/slots/ports/slot.repository.port.ts";
import { Slot } from "src/slots/domain/slot.entity.ts";
import { Collection } from "mongo";

export class SlotRepositoryAdapter extends GenericCrud<Slot>
  implements SlotRepository {
  constructor(collection: Collection<Slot>) {
    super(Slot.constructor.name, collection);
  }
}
