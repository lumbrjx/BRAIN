import { z } from "zod";

export const IdSchema = z.object({
  id: z.string().max(100),
});

export interface IdSchemaData extends z.infer<typeof IdSchema> { }
