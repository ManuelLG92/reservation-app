import { AggregateRoot } from "../entity/aggregate-root.entity.ts";

export class GenericCrud<Out, T extends AggregateRoot<Out>> {
  protected readonly records: Map<string, T>;
  constructor(readonly entity: string) {
    this.records = new Map();
  }

  upsert(value: T): Promise<void> {
    this.records.set(value.id, value);
    return Promise.resolve();
  }

  findById(id: string): Promise<Out> {
    const result = this.records.get(id);
    if (result) {
      return Promise.resolve(result.toJson());
    }
    throw new Error(`${this.entity} with id ${id} not found`);
  }

  findAll(): Promise<Out[]> {
    return Promise.resolve(
      [...this.records.values()].map((value) => value.toJson()),
    );
  }
}
