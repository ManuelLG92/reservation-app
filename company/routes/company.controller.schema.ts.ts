import { z } from "zod";

export const findAllCompaniesSchema = z.object({
  start_at: z.coerce.date().optional(),
  end_at: z.coerce.date().optional(),
}).transform(({ start_at, end_at }) => ({
  startAt: start_at,
  endAt: end_at,
}));
