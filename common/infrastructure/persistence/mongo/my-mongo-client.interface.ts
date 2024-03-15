import { Db } from "mongo";

export interface MyMongoClientInterface {
  initDb(): void;
  getDb(): Db;
}
