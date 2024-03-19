import { Model } from "mongoose";
import { UserSchemaType } from "src/common/infrastructure/persistence/mongoose/schemas/user.schema.ts";
import { User, UserProps } from "src/user/user.entity.ts";

export class UserRepository {
  constructor(private readonly model: Model<UserSchemaType>) {
  }

  async findById(id: string): Promise<User> {
    const user = await this.model.findOne({ _id: id }).lean();
    return new User(user as unknown as UserProps);
  }
}
