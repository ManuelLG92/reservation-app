import { CompanyRepository } from "../company/company.repository.ts";
import { FloorRepository } from "../floor/floor.repository%20copy.ts";
import { OfficeRepository } from "../office/office.repository%20copy.ts";
import { SeatRepository } from "../seat/seat.repository%20copy.ts";
import { SlotRepository } from "../slots/slot.repository%20copy.ts";
import { UserRepository } from "../user/user.repository%20copy.ts";

export enum DiKeys {
  CompanyRepository = "CompanyRepository",
  FloorRepository = "FloorRepository",
  OfficeRepository = "OfficeRepository",
  SeatRepository = "SeatRepository",
  SlotRepository = "SlotsRepository",
  UserRepository = "UserRepository",
}

type TypeMatching = {
  [DiKeys.CompanyRepository]: CompanyRepository;
  [DiKeys.FloorRepository]: FloorRepository;
  [DiKeys.OfficeRepository]: OfficeRepository;
  [DiKeys.SeatRepository]: SeatRepository;
  [DiKeys.SlotRepository]: SlotRepository;
  [DiKeys.UserRepository]: UserRepository;
};
class DIContainer {
  private dependencies: Partial<Record<DiKeys, unknown>> = {};
  register<K extends DiKeys>(key: K, dependency: TypeMatching[K]) {
    if (this.dependencies[key]) {
      throw new Error(
        `Dependency with key ${key.toString()} is already registered.`,
      );
    }
    this.dependencies[key] = dependency;
  }
  resolve<T extends DiKeys>(key: T): TypeMatching[T] {
    const dependency = this.dependencies[key];
    if (!dependency) {
      throw new Error(
        `Dependency with key ${key.toString()} is not registered.`,
      );
    }
    return dependency as TypeMatching[T];
  }
}

export const diContainer = new DIContainer();

const companyRepository = new CompanyRepository();
const floorRepository = new FloorRepository();
const officeRepository = new OfficeRepository();
const seatRepository = new SeatRepository();
const slotRepository = new SlotRepository();
const userRepository = new UserRepository();

diContainer.register(DiKeys.CompanyRepository, companyRepository);
diContainer.register(DiKeys.FloorRepository, floorRepository);
diContainer.register(DiKeys.OfficeRepository, officeRepository);
diContainer.register(DiKeys.SeatRepository, seatRepository);
diContainer.register(DiKeys.SlotRepository, slotRepository);
diContainer.register(DiKeys.UserRepository, userRepository);
