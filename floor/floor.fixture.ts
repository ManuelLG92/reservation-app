import { Floor } from "src/floor/floor.entity.ts";

export const floorFixture = (name?: string) =>
  new Floor({ identifier: name ?? "floot-fixture", seats: [] });
