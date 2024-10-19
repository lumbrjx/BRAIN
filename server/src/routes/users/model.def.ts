import { z } from "zod";

export const IdSchema = z.object({
	id: z.string().max(100).optional(),
});
export const IdSchemadel = z.object({
	id: z.string().max(100),
});


export interface IdSchemaData extends z.infer<typeof IdSchema> { }
export interface IdSchemaDatadel extends z.infer<typeof IdSchemadel> { }
