import { CompanyRepositoryAdapter } from "../../company/adapters/company.repository.adapter.ts";
import { CompanyRepository } from "../../company/ports/company.repository.port.ts";
import { FloorRepository } from "../../floor/floor.repository.ts";
import { OfficeRepository } from "../../office/office.repository.ts";
import { SeatRepositoryAdapter } from "../../seat/adapter/seat.repository.adapter.ts";
import { SeatRepository } from "../../seat/ports/seat.repository.port.ts";
import { SlotRepository } from "../../slots/ports/slot.repository.port.ts";
import { SlotRepositoryAdapter } from "../../slots/adapters/slot.repository.adapter.ts";
import { UserRepository } from "../../user/user.repository.ts";
import { Logger, LoggerInterface } from "../observability/logger.ts";

export enum DiKeys {
  CompanyRepository = "CompanyRepository",
  FloorRepository = "FloorRepository",
  OfficeRepository = "OfficeRepository",
  SeatRepository = "SeatRepository",
  SlotRepository = "SlotsRepository",
  UserRepository = "UserRepository",
  Logger = "Logger",
}

type TypeMatching = {
  [DiKeys.CompanyRepository]: CompanyRepository;
  [DiKeys.FloorRepository]: FloorRepository;
  [DiKeys.OfficeRepository]: OfficeRepository;
  [DiKeys.SeatRepository]: SeatRepository;
  [DiKeys.SlotRepository]: SlotRepository;
  [DiKeys.UserRepository]: UserRepository;
  [DiKeys.Logger]: LoggerInterface;
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

const companyRepository = new CompanyRepositoryAdapter();
const floorRepository = new FloorRepository();
const officeRepository = new OfficeRepository();
const seatRepository = new SeatRepositoryAdapter();
const slotRepository = new SlotRepositoryAdapter();
const userRepository = new UserRepository();
const logger = new Logger();

diContainer.register(DiKeys.CompanyRepository, companyRepository);
diContainer.register(DiKeys.FloorRepository, floorRepository);
diContainer.register(DiKeys.OfficeRepository, officeRepository);
diContainer.register(DiKeys.SeatRepository, seatRepository);
diContainer.register(DiKeys.SlotRepository, slotRepository);
diContainer.register(DiKeys.UserRepository, userRepository);
diContainer.register(DiKeys.Logger, logger);

export const getLogger = () => diContainer.resolve(DiKeys.Logger);
