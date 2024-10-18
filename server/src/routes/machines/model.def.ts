import { MachinesTableSchema } from "src/database/models";
import { RouteResponse } from "src/shared/models";
import { z } from "zod";

// -- /,get,machines,body,getMachines
export const MachinesSchema = MachinesTableSchema.omit({
	id: true
})

// -- ign
export const MachinesResponse =  RouteResponse.extend({
		message: z.array(MachinesSchema)
})

export interface MachinesSchemaData extends z.infer<typeof MachinesSchema> { }
