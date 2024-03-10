import { User } from "./user.entity.ts";

export const userFixture = (name?: string) => new User(name ?? "user-fixture");
