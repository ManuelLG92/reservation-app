import { userFixture } from "src/user/user.fixture.ts";
import { Slot, SlotInputProps } from "src/slots/domain/slot.entity.ts";

export const slotFixture = (
  { startAt: startAtValue, endAt: endAtValue, user }: Partial<SlotInputProps> =
    {},
) =>
  new Slot({
    startAt: startAtValue ?? new Date("2024-03-10T08:02:10.888Z"),
    endAt: endAtValue ?? new Date("2024-03-10T19:02:10.888Z"),
    user: user ?? userFixture(),
  });
