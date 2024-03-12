import { GenericCrud } from "../../common/persistence/generic-crud.ts";
import { SlotRepository } from "../ports/slot.repository.port.ts";
import { Slot } from "../domain/slot.entity.ts";

export class SlotRepositoryAdapter extends GenericCrud<Slot>
  implements SlotRepository {
  constructor() {
    super(Slot.constructor.name);
  }
}
