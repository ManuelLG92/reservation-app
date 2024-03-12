import { diContainer, DiKeys } from "./common/di-container/di-container.ts";
import { companyFixture } from "./company/__tests__/company.fixtures.ts";
import { floorFixture } from "./floor/floor.fixture.ts";
import { officeFixture } from "./office/office.fixture.ts";
import { seatFixture } from "./seat/seat.fixture.ts";
import { slotFixture } from "./slots/slot.fixture.ts";
import { userFixture } from "./user/user.fixture.ts";

export const mainFixtures = () => {
  const userValue = userFixture("my-user-name");
  const companyValue = companyFixture();
  const officeInitial = officeFixture();
  const floorInitial = floorFixture();
  const seatInitial = seatFixture();
  const slotInitial = slotFixture({ user: userValue });
  const slotRepository = diContainer.resolve(
    DiKeys.SlotRepository,
  );
  slotRepository.upsert(slotInitial);
  seatInitial.addDraftSlot(slotInitial).confirmSlot(slotInitial.id);
  const seatRepository = diContainer.resolve(
    DiKeys.SeatRepository,
  );
  seatRepository.upsert(seatInitial);
  floorInitial.addSeat(seatInitial);
  const floorRepository = diContainer.resolve(
    DiKeys.FloorRepository,
  );
  floorRepository.upsert(floorInitial);
  officeInitial.addFloor(floorInitial);
  const officeRepository = diContainer.resolve(
    DiKeys.OfficeRepository,
  );
  officeRepository.upsert(officeInitial);

  companyValue.addOffice(officeInitial);
  const companyRepository = diContainer.resolve(
    DiKeys.CompanyRepository,
  );
  companyRepository.upsert(companyValue);
};
