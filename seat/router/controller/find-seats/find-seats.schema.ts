import { z } from "zod";
import { idSchema } from "src/common/infrastructure/validator/id.schema.ts";

export const findSeatByIdSchema = idSchema;

export type findSeatByIdSchemaDto = z.infer<typeof findSeatByIdSchema>;
