import { load } from "dotenv";
import { floorModel } from "src/floor/floor.schema.ts";
import { officeModel } from "src/office/office.schema.ts";
import { seatModel } from "src/seat/adapter/seat.schema.ts";
import { CompanyRepositoryAdapter } from "src/company/adapters/company.repository.adapter.ts";
import { CompanyRepository } from "src/company/ports/company.repository.port.ts";
import { FloorRepository } from "src/floor/floor.repository.ts";
import { OfficeRepository } from "src/office/office.repository.ts";
import { SeatRepositoryAdapter } from "src/seat/adapter/seat.repository.adapter.ts";
import { SlotRepositoryAdapter } from "src/slots/adapters/slot.repository.adapter.ts";
import { Logger, LoggerInterface } from "../observability/logger.ts";
import { companyModel } from "src/company/adapters/company.schema.ts";
import { slotModel } from "src/slots/adapters/slot.schema.ts";
import { userModel } from "src/user/user.schema.ts";
import { UserRepository } from "src/user/user.repository.ts";
import { SeatRepository } from "src/seat/ports/seat.repository.port.ts";
import { SlotRepository } from "src/slots/ports/slot.repository.port.ts";
import { initMongoose } from "src/common/infrastructure/persistence/mongoose/mongoose-connect.ts";
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
const logger = new Logger();

diContainer.register(DiKeys.Logger, logger);

export const getLogger = () => diContainer.resolve(DiKeys.Logger);

const pairs = await load();

const connectionUrl = pairs["MONGO_DB_CONNECTION_URL"];
await initMongoose(connectionUrl);
const companyRepository = new CompanyRepositoryAdapter(
  companyModel,
);
const floorRepository = new FloorRepository(floorModel);
const officeRepository = new OfficeRepository(officeModel);
const seatRepository = new SeatRepositoryAdapter(seatModel);
const slotRepository = new SlotRepositoryAdapter(slotModel);
const userRepository = new UserRepository(userModel);
diContainer.register(DiKeys.CompanyRepository, companyRepository);
diContainer.register(DiKeys.FloorRepository, floorRepository);
diContainer.register(DiKeys.OfficeRepository, officeRepository);
diContainer.register(DiKeys.SeatRepository, seatRepository);
diContainer.register(DiKeys.SlotRepository, slotRepository);
diContainer.register(DiKeys.UserRepository, userRepository);
