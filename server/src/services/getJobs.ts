import { db } from "src/config/database";
import { JobsTableInterface } from "src/database/models";
import { jobs } from "src/database/schema";
import { parseToResult, Result } from "src/shared/result";

const getJobs = async () => {
	const job = db.select().from(jobs)
	return job;
};

export async function getJobsService(): Promise<Result<JobsTableInterface[] | boolean | undefined, Error | string | undefined>> {
	try {

		const jobs = await getJobs();

		return parseToResult(jobs);
	} catch (error) {

		console.log(error)
		return parseToResult(undefined, "INTERNAL SERVER ERROR");
	}
}


