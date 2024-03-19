import {
  AggregateRoot,
  AggregateRootProps,
} from "src/common/domain/entity/aggregate-root.entity.ts";
import { UserSchemaType } from "src/user/user.schema.ts";
export interface UserProps extends AggregateRootProps {
  name: string;
}
export class User extends AggregateRoot<UserProps, UserSchemaType> {
  #name: string;
  constructor({ name, ...rest }: UserProps) {
    super({ ...rest, id: rest.id ?? "a6c55ce7-a78b-46fa-a0df-7b5007d0e385" });
    this.#name = name;
  }

  get name(): string {
    return this.#name;
  }

  static fromPrimitives({ createdAt, updatedAt, ...rest }: UserProps) {
    const user = new User({
      ...rest,
      createdAt: new Date(createdAt),
      updatedAt: updatedAt ? new Date(updatedAt) : undefined,
    });
    return user;
  }

  toJson() {
    return {
      ...this.aggregateRootPrimitives(),
      name: this.name,
    };
  }
  toPersistance() {
    return this.toJson();
  }
}
