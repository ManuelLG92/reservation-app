import {
  AggregateRoot,
  AggregateRootProps,
} from "../common/entity/aggregate-root.entity.ts";
export interface UserProps extends AggregateRootProps {
  name: string;
}

export class User extends AggregateRoot<UserProps> {
  #name: string;
  constructor(name: string) {
    super();
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
}
