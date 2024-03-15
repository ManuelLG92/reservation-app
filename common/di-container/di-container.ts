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
import { MyMongoClient } from "src/common/infrastructure/persistence/mongo/my-mongo-client.ts";
import { MyMongoClientInterface } from "src/common/infrastructure/persistence/mongo/my-mongo-client.interface.ts";
import { load } from "dotenv";
export enum DiKeys {
  CompanyRepository = "CompanyRepository",
  FloorRepository = "FloorRepository",
  OfficeRepository = "OfficeRepository",
  SeatRepository = "SeatRepository",
  SlotRepository = "SlotsRepository",
  UserRepository = "UserRepository",
  Logger = "Logger",
  MongoDb = "MongoDb",
}

type TypeMatching = {
  [DiKeys.CompanyRepository]: CompanyRepository;
  [DiKeys.FloorRepository]: FloorRepository;
  [DiKeys.OfficeRepository]: OfficeRepository;
  [DiKeys.SeatRepository]: SeatRepository;
  [DiKeys.SlotRepository]: SlotRepository;
  [DiKeys.UserRepository]: UserRepository;
  [DiKeys.Logger]: LoggerInterface;
  [DiKeys.MongoDb]: MyMongoClientInterface;
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

console.log("here");
const pairs = await load();

const connectionUrl = pairs["MONGO_DB_CONNECTION_URL"];
const mongodb = new MyMongoClient({ logger, url: connectionUrl });
diContainer.register(DiKeys.MongoDb, mongodb);
const db = mongodb.getDb();
const companyRepository = new CompanyRepositoryAdapter(
  db.collection("companies"),
);
const floorRepository = new FloorRepository(db.collection("floors"));
const officeRepository = new OfficeRepository(db.collection("offices"));
const seatRepository = new SeatRepositoryAdapter(db.collection("seats"));
const slotRepository = new SlotRepositoryAdapter(db.collection("slots"));
const userRepository = new UserRepository(db.collection("users"));
diContainer.register(DiKeys.CompanyRepository, companyRepository);
diContainer.register(DiKeys.FloorRepository, floorRepository);
diContainer.register(DiKeys.OfficeRepository, officeRepository);
diContainer.register(DiKeys.SeatRepository, seatRepository);
diContainer.register(DiKeys.SlotRepository, slotRepository);
diContainer.register(DiKeys.UserRepository, userRepository);
