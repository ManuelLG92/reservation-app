import { Model } from "mongoose";
import { Company, CompanyPropsOut } from "src/company/domain/company.entity.ts";
import {
  CompanyRepository,
  FindAllArgs,
} from "src/company/ports/company.repository.port.ts";
import { CompanySchemaType } from "src/company/adapters/company.schema.ts";
import { ReservationSchemas } from "src/common/infrastructure/persistence/mongoose/mongoose-connect.ts";

export class CompanyRepositoryAdapter implements CompanyRepository {
  constructor(private readonly model: Model<CompanySchemaType>) {
  }

  async findAll(
    {
      startAt = new Date(),
      endAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    }: FindAllArgs = {},
  ): Promise<Company[]> {
    const data = await this.model.find({}).populate({
      path: "offices",
      model: ReservationSchemas.Offices,
      foreignField: "id",
      populate: {
        path: "floors",
        model: ReservationSchemas.Floors,
        foreignField: "id",
        populate: {
          path: "seats",
          model: ReservationSchemas.Seat,
          foreignField: "id",
          populate: {
            path: "slots",
            model: ReservationSchemas.Slots,
            foreignField: "id",
            match: {
              startAt: { $gte: startAt },
              endAt: { $lte: endAt },
            },
            populate: {
              path: "user",
              model: ReservationSchemas.Users,
              foreignField: "id",
            },
          },
        },
      },
    }).lean() as unknown as CompanyPropsOut[];
    const toDomain = data.map((item) => Company.fromPrimitives(item));
    return toDomain;
  }

  async upsert(value: Company): Promise<void> {
    await this.model.updateOne(
      { id: value.id },
      { $set: value.toPersistance() },
      { upsert: true },
    );
  }
}
