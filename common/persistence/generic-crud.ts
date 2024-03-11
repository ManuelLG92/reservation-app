import { AggregateRoot } from "../entity/aggregate-root.entity.ts";

export class GenericCrud<Out, T extends AggregateRoot<Out>> {
  protected readonly records: Map<string, T>;
  constructor(readonly entity: string) {
    this.records = new Map();
  }

  upsert(value: T): void {
    this.records.set(value.id, value);
  }

  findById(id: string): Out {
    const result = this.records.get(id);
    if (result) {
      return result.toJson();
    }
    throw new Error(`${this.entity} with id ${id} not found`);
  }

  findAll(): Out[] {
    return [...this.records.values()].map((value) => value.toJson());
  }
}
