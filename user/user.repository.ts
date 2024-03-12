import { GenericCrud } from "../common/persistence/generic-crud.ts";
import { User } from "./user.entity.ts";

export class UserRepository extends GenericCrud<User> {
  constructor() {
    super(User.prototype.constructor.name);
  }
}
