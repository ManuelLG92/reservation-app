import { z } from "zod";
import { idSchema } from "src/common/infrastructure/validator/id.schema.ts";

export const findSeatByIdSchema = idSchema;

export type findSeatByIdSchemaDto = z.infer<typeof findSeatByIdSchema>;


export const findSlotsSchema = z.object({
    start_at: z.coerce.date().optional(),
    end_at: z.coerce.date().optional(),
  }).transform(({ start_at, end_at }) => ({
    startAt: start_at,
    endAt: end_at,
  }));
export const findSeatsSchema = z.object({
  start_at: z.coerce.date().optional(),
  end_at: z.coerce.date().optional(),
  slots_start_at: z.coerce.date().optional(),
  slots_end_at: z.coerce.date().optional(),
}).transform(({ start_at, end_at, ...slots }) => ({
  startAt: start_at,
  endAt: end_at,
  slots: {
    startAt: slots.slots_start_at,
    endAt: slots.slots_end_at,
  }
}));