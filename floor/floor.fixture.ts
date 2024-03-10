import { Floor } from "./floor.entity.ts";

export const floorFixture = (name?: string) =>
  new Floor(name ?? "floot-fixture");
