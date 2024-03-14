import { z } from "zod";

export const idSchema = z.string().min(1).max(40);

export type idTypeDto = z.infer<typeof idSchema>;
