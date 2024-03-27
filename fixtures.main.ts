import { diContainer, DiKeys } from "src/common/di-container/di-container.ts";
// import { companyFixture } from "src/company/__tests__/company.fixtures.ts";
import { floorFixture } from "src/floor/floor.fixture.ts";
// import { officeFixture } from "src/office/office.fixture.ts";
import { Seat } from "src/seat/domain/seat.entity.ts";
import { seatFixture } from "src/seat/seat.fixture.ts";
import { slotFixture } from "src/slots/slot.fixture.ts";
import { userFixture } from "src/user/user.fixture.ts";

export const mainFixtures = () => {
  const userValue = userFixture("my-user-name");
  // const companyValue = companyFixture();
  // const officeInitial = officeFixture();
  const floorInitial = floorFixture();
  const seatInitial = seatFixture("seat-100");

  const seatRepository = diContainer.resolve(
    DiKeys.SeatRepository,
  );
  const seats: Seat[] = [];
  const seatsToCreate = 10;

  seatRepository.upsert(seatInitial);

  for (let index = 0; index < seatsToCreate; index++) {
    const seatCreated = seatFixture(`seat-${index + 1}`);
    seatRepository.upsert(seatCreated);
    seats.push(seatCreated);
  }
  const slotInitial = slotFixture({ user: userValue });
  const slotRepository = diContainer.resolve(
    DiKeys.SlotRepository,
  );
  slotRepository.upsert(slotInitial);
  seatInitial.addDraftSlot(slotInitial).confirmSlot(slotInitial.id);

  seatRepository.upsert(seatInitial);
  floorInitial.addBulkSeats(seats);
  const floorRepository = diContainer.resolve(
    DiKeys.FloorRepository,
  );
  floorRepository.upsert(floorInitial);
  // officeInitial.addFloor(floorInitial);
  // const officeRepository = diContainer.resolve(
  //   DiKeys.OfficeRepository,
  // );
  // officeRepository.upsert(officeInitial);

  // companyValue.addOffice(officeInitial);
  // const companyRepository = diContainer.resolve(
  //   DiKeys.CompanyRepository,
  // );
  // companyRepository.upsert(companyValue);

  // const userRepository = diContainer.resolve(
  //   DiKeys.UserRepository,
  // );

  // userRepository.upsert(userValue);
};
