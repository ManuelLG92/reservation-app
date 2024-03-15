import { Db, MongoClient, MongoClientOptions } from "mongo";
import { LoggerInterface } from "src/common/observability/logger.ts";
import { MyMongoClientInterface } from "src/common/infrastructure/persistence/mongo/my-mongo-client.interface.ts";

export class MyMongoClient implements MyMongoClientInterface {
  private readonly client: MongoClient;
  private readonly logger: LoggerInterface;
  #db!: Db;
  constructor(
    { logger, url, options }: {
      logger: LoggerInterface;
      url: string;
      options?: MongoClientOptions;
    },
  ) {
    this.client = new MongoClient(url, options);
    this.logger = logger;
    this.connect()
      .then()
      .catch((e) => {
        this.logger.error(
          `Failed connecting to MongoDB. Reason: ${(e as Error).message}`,
        );
        throw e;
      });
  }

  async connect() {
    this.logger.info("Connecting to MongoDB");
    await this.client.connect();
    this.logger.info("MongoDB connected successfully");
  }

  initDb() {
    this.#db = this.client.db();
  }
  getDb() {
    if (!this.#db) {
      this.initDb();
    }
    return this.#db;
  }
}
