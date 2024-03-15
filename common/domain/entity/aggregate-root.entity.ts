export interface AggregateRootProps {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export abstract class AggregateRoot<ToJSON> {
  get updatedAt(): Date | undefined {
    return this._updatedAt;
  }
  get createdAt(): Date {
    return this._createdAt;
  }
  get id(): string {
    return this._id;
  }

  protected readonly _id: string;
  protected readonly _createdAt: Date;
  protected _updatedAt?: Date;
  constructor(id?: string) {
    this._id = id ?? crypto.randomUUID();
    this._createdAt = new Date();
  }

  protected update(value: Date) {
    this._updatedAt = value;
  }

  protected aggregateRootPrimitives(): AggregateRootProps {
    return {
      id: this._id,
      createdAt: this._createdAt.toISOString(),
      updatedAt: this._updatedAt?.toISOString() ?? "null",
    };
  }

  abstract toJson(): ToJSON;

  protected fromObject(data: Record<string, unknown>) {
    return { ...data };
  }
}
