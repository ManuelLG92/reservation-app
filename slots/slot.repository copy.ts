import { GenericCrud } from "../common/generic-crud.ts";
import { Slot, SlotOutputProps } from "./slot.entity.ts";

export class SlotRepository extends GenericCrud<SlotOutputProps, Slot> {
  constructor() {
    super(Slot.constructor.name);
  }
}
