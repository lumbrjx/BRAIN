// import Redis from "ioredis";
// import { config } from "dotenv";
// import { drizzle } from "drizzle-orm/node-postgres";
// import pg from "pg";
// import * as schema from "../database/schema";
// import { and, lt } from "drizzle-orm";
// import cron from "node-cron";
// import { parseToResult, Result } from "src/shared/result";
// import schedule from "node-schedule"
// config()
// export const pool = new pg.Pool({
// 	connectionString: process.env.POSTGRES_URL,
// 	ssl: true
// });
//
//
// export const db = drizzle(pool, { schema });
// console.log(process.env.REDIS_QUEUE)
// export const redis = new Redis(process.env.REDIS_HOST);
//
// export function scheduleJobAfterHours(delayInHours: number, jobCallback: any) {
// 	const runTime = new Date(Date.now() + delayInHours * 60 * 60 * 1000);
// 	console.log(`Job scheduled to run at: ${runTime}`);
//
// 	schedule.scheduleJob(runTime, () => {
// 		console.log('Job executed!');
// 		jobCallback();
// 	});
// }
//
//
//
// export async function CheckJob(): Promise<
// 	Result<any | boolean | undefined, Error | string | undefined>
// > {
// 	try {
// 		const ord = await db.select({ name: schema.jobs.name, machine_id: schema.jobs.machine_id }).from(schema.jobs).where(
// 			and(
// 				lt(schema.jobs.timesc, new Date()),
// 			),
// 		)
// 		return parseToResult(ord);
// 	} catch (error: any) {
// 		return parseToResult(undefined, "ROLLBACK");
// 	}
// }
// cron.schedule("*/5 * * * *", async () => {
// 	const deleted = await CheckJob();
//
// 	if (deleted.data) {
// 		const msg = JSON.stringify(deleted.data);
// 		redis.lpush("ALERT_QUEUE", "", Buffer.from(msg));
// 	}
// });
// }
//
//
