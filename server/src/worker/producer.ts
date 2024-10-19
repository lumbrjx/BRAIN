import Redis from "ioredis";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "../database/schema";
import { getNextThreeHours } from "src/shared/time";
import schedule from "node-schedule"
import { eq } from "drizzle-orm";

config()
export const pool = new pg.Pool({
	connectionString: process.env.POSTGRES_URL,
	ssl: false 
});
export const db = drizzle(pool, { schema });
export const redis = new Redis(process.env.REDIS_HOST);

export function scheduleJobAfterHours(delayInHours: number, jobCallback: any) {
	const runTime = new Date(Date.now() + delayInHours * 1000);
	console.log(`Job scheduled to run at: ${runTime}`);

	schedule.scheduleJob(runTime, () => {
		console.log('Job executed!');
		jobCallback();
	});
}

function processTaskQueue() {
	redis.brpop('MAINTENECE_QUEUE', 0, async (err, result) => {
		if (err) {
			console.error('Error processing task from queue:', err);
		} else if (result) {
			const task = result[1];
			console.log(`Processing task: ${task}`);
			const job = JSON.parse(task)
			const time = getNextThreeHours()
			try {
				await db.insert(schema.jobs).values({
					name: job.task,
					machine_id: job.machine_id,
					timesc: time.toISOString()
				})
				scheduleJobAfterHours(Math.floor(Math.random() * 5) + 1, async () => {
					await redis.publish("ALERT_CHANNEL", JSON.stringify({ type: "JOB", data: job.task }))
					console.log("published task")
					await db.transaction(async (tx) => {
						await tx.delete(schema.jobs).where(eq(schema.jobs.machine_id, job.machine_id))
						await tx.update(schema.machines).set({ state: "UNDER_MAINTENENCE" }).where(eq(schema.machines.name, job.machine_id))

					})
					console.log("finished task")

				})
				await redis.publish("ALERT_CHANNEL", JSON.stringify({ type: "LOG", data: `new job created: ${job.task}` }))



			} catch (e: any) {
				if (e.code === "23505") {
					console.log("job already exists")
				} else {
					console.log(e)
				}

			}

			processTaskQueue();
		}
	});
}

processTaskQueue();

