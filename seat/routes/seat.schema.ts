import { z } from "zod";

export const bookSeatSlotSchema = z.object({
  seat_id: z.number().min(0).max(20),
  user_id: z.string().length(36),
  from: z.coerce.date(),
  to: z.coerce.date(),
});
