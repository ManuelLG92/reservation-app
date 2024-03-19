import { Model } from "mongoose";
import { NotFoundError } from "src/common/errors/not-found-error.ts";
import { BaseSchemaType } from "src/common/infrastructure/persistence/mongoose/schemas/base.schema.ts";

export class GenericCrudV2<
  T extends BaseSchemaType,
> {
  constructor(
    protected readonly collection: Model<T>,
  ) {
  }

  async upsert(value: T): Promise<void> {
    await this.collection.updateOne(
      { _id: value.id },
      { $set: value },
      { upsert: true },
    );
    return Promise.resolve();
  }

  async findById(id: string): Promise<T> {
    const result = await this.collection.findOne({ _id: id }, {
      projection: { _id: false },
    }).exec();
    if (result) {
      return result;
    }
    throw new NotFoundError(
      `${this.collection.modelName} with id ${id} not found`,
    );
  }

  async findAll(): Promise<T[]> {
    const result = await this.collection.find({}, {
      projection: { _id: false },
    }).exec();
    return result;
  }
}
