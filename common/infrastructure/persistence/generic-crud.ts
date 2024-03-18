import {
  AggregateRoot,
  AggregateRootOutProps,
} from "src/common/domain/entity/aggregate-root.entity.ts";
import { NotFoundError } from "src/common/errors/not-found-error.ts";
import { Collection } from "mongo";

interface Searchable extends AggregateRootOutProps {
  _id: string;
}

export class GenericCrud<
  T extends AggregateRoot<AggregateRootOutProps, AggregateRootOutProps>,
> {
  protected collection: Collection<Searchable>;
  constructor(
    readonly entity: string,
    collection: Collection<T>,
  ) {
    this.collection = collection as unknown as Collection<Searchable>;
  }

  async upsert(value: T): Promise<void> {
    await this.collection.updateOne(
      { _id: value.id },
      { $set: value.toPersistance() },
      { upsert: true },
    );
    return Promise.resolve();
  }

  async findById(id: string): Promise<T> {
    const result = await this.collection.findOne({ _id: id }, {
      projection: { _id: false },
    });
    if (result) {
      return result as unknown as Promise<T>;
    }
    throw new NotFoundError(`${this.entity} with id ${id} not found`);
  }

  async findAll(): Promise<T[]> {
    const result = this.collection.find({}).project({ _id: false });
    const data = await result.toArray() as unknown as Promise<T[]>;
    return data;
  }
}
