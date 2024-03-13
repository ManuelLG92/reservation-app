import { GenericCrud } from "src/common/infrastructure/persistence/generic-crud.ts";
import { SlotRepository } from "src/slots/ports/slot.repository.port.ts";
import { Slot } from "src/slots/domain/slot.entity.ts";

export class SlotRepositoryAdapter extends GenericCrud<Slot>
  implements SlotRepository {
  constructor() {
    super(Slot.constructor.name);
  }
}
