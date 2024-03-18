import { User } from "src/user/user.entity.ts";

export const userFixture = (name?: string) =>
  new User({ name: name ?? "user-fixture" });
