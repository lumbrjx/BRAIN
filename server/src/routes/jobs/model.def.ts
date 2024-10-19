import { JobsTableSchema } from "src/database/models";
import { RouteResponse } from "src/shared/models";
import { z } from "zod";


// --/,get,jobs,body,getJobs 
export const JobsResponse = RouteResponse.extend({
		message: z.array(JobsTableSchema)
})





export interface JobsResponseData extends z.infer<typeof JobsResponse> { }