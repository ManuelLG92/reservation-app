import { AggregateRoot } from "src/common/domain/entity/aggregate-root.entity.ts";

export class GenericCrud<T extends AggregateRoot<unknown>> {
  protected readonly records: Map<string, T>;
  constructor(readonly entity: string) {
    this.records = new Map();
  }

  upsert(value: T): Promise<void> {
    this.records.set(value.id, value);
    return Promise.resolve();
  }

  findById(id: string): Promise<T> {
    const result = this.records.get(id);
    if (result) {
      return Promise.resolve(result);
    }
    throw new Error(`${this.entity} with id ${id} not found`);
  }

  findAll(): Promise<T[]> {
    return Promise.resolve(
      [...this.records.values()],
    );
  }
}
