import { GenericCrud } from "../common/generic-crud.ts";
import { User, UserProps } from "./user.entity.ts";

export class UserRepository extends GenericCrud<UserProps, User> {
  constructor() {
    super(User.constructor.name);
  }
}
