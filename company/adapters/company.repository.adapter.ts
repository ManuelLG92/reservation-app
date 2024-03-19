import { Company, CompanyPropsOut } from "src/company/domain/company.entity.ts";
import { CompanyRepository } from "src/company/ports/company.repository.port.ts";
import { Model } from "mongoose";
import { companySchemaType } from "src/common/infrastructure/persistence/mongoose/schemas/company.schema.ts";
import { ReservationSchemas } from "src/common/infrastructure/persistence/mongoose/mongoose-schemas.ts";

export class CompanyRepositoryAdapter implements CompanyRepository {
  constructor(private readonly model: Model<companySchemaType>) {
  }

  async findAll(): Promise<Company[]> {
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
