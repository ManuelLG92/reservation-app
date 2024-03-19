export interface AggregateRootProps {
  id: string;
  createdAt: Date;
  updatedAt?: Date;
}

export abstract class AggregateRoot<ToJSON, ToPersistance> {
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
  protected constructor(
    { id, createdAt, updatedAt }: Partial<AggregateRootProps>,
  ) {
    this._id = id ?? crypto.randomUUID();
    this._createdAt = createdAt ?? new Date();
    this._updatedAt = updatedAt ?? new Date();
  }

  protected update(value: Date) {
    this._updatedAt = value;
  }

  protected aggregateRootPrimitives(): AggregateRootProps {
    return {
      id: this._id,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }

  abstract toJson(): ToJSON;
  abstract toPersistance(): ToPersistance;
}
