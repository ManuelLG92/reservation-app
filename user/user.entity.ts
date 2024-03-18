import {
  AggregateRoot,
  AggregateRootOutProps,
  AggregateRootProps,
} from "src/common/domain/entity/aggregate-root.entity.ts";
export interface UserProps extends AggregateRootProps {
  name: string;
}
export interface UserPropsOut extends AggregateRootOutProps {
  name: string;
}

export class User extends AggregateRoot<UserPropsOut, UserPropsOut> {
  #name: string;
  constructor({ name, ...rest }: UserProps) {
    super({ ...rest, id: rest.id ?? "a6c55ce7-a78b-46fa-a0df-7b5007d0e385" });
    this.#name = name;
  }

  get name(): string {
    return this.#name;
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
