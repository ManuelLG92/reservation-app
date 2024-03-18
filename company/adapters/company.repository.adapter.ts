import {
  Company,
  CompanyToPersistence,
} from "src/company/domain/company.entity.ts";
import { CompanyRepository } from "src/company/ports/company.repository.port.ts";
import { Collection } from "mongo";

export class CompanyRepositoryAdapter implements CompanyRepository {
  constructor(private readonly collection: Collection<CompanyToPersistence>) {
  }

  async findAll(): Promise<CompanyToPersistence[]> {
    return await this.collection.find({}).toArray();
  }

  async upsert(value: Company): Promise<void> {
    await this.collection.updateOne(
      { id: value.id },
      { $set: value.toPersistance() },
      { upsert: true },
    );
  }
}
