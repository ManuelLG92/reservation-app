import { GenericCrud } from "src/common/infrastructure/persistence/generic-crud.ts";
import { User } from "src/user/user.entity.ts";

export class UserRepository extends GenericCrud<User> {
  constructor() {
    super(User.prototype.constructor.name);
  }
}
