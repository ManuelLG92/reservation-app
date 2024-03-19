export interface AggregateRootProps {
  id: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface AggregateRootOutProps {
  id: string;
  createdAt: string;
  updatedAt?: string;
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

  protected aggregateRootPrimitives(): AggregateRootOutProps {
    return {
      id: this._id,
      createdAt: this._createdAt.toISOString(),
      updatedAt: this._updatedAt?.toISOString() ?? "null",
    };
  }

  abstract toJson(): ToJSON;
  abstract toPersistance(): ToPersistance;

  protected static convertOutputToInput(
    { id, createdAt, updatedAt }: AggregateRootOutProps,
  ): AggregateRootProps {
    return {
      id,
      createdAt: new Date(createdAt),
      updatedAt: updatedAt ? new Date(updatedAt) : undefined,
    };
  }
}
