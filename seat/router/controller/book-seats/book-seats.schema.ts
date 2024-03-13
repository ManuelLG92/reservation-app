import { z } from "zod";

export const bookSeatSlotSchema = z.object({
  seat_id: z.number().min(0).max(20),
  user_id: z.string().length(36),
  start_at: z.coerce.date(),
  end_at: z.coerce.date(),
}).transform((data) => ({
  seatId: data.seat_id,
  userId: data.user_id,
  startAt: data.start_at,
  endAt: data.end_at,
}));

export type bookSeatSlotDto = z.infer<typeof bookSeatSlotSchema>;
