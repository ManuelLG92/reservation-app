import {
  AggregateRoot,
  AggregateRootProps,
} from "src/common/domain/entity/aggregate-root.entity.ts";
import { NotFoundError } from "src/common/errors/not-found-error.ts";
import { Collection } from "mongo";

interface Searchable extends AggregateRootProps {
  _id: string;
}
export class GenericCrud<T extends AggregateRoot<AggregateRootProps>> {
  protected readonly records: Map<string, T>;
  constructor(
    readonly entity: string,
    protected readonly collection: Collection<Searchable>,
  ) {
    this.records = new Map();
  }

  async upsert(value: T): Promise<void> {
    this.records.set(value.id, value);
    await this.collection.updateOne(
      { _id: value.id },
      { $set: value.toJson() },
      { upsert: true },
    );
    return Promise.resolve();
  }

  async findById(id: string): Promise<T> {
    const result = this.records.get(id);
    const result2 = await this.collection.findOne({ _id: id });
    console.log(result2);
    if (result) {
      return Promise.resolve(result);
    }
    throw new NotFoundError(`${this.entity} with id ${id} not found`);
  }

  async findAll(): Promise<T[]> {
    const result2 = this.collection.find({});
    return result2.toArray() as unknown as T[];
    for await (const doc of result2) {
      console.dir(doc);
    }
    return Promise.resolve(
      [...this.records.values()],
    );
  }
}
