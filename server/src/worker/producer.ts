import Redis from "ioredis";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "../database/schema";
import { getNextThreeHours } from "src/shared/time";
config()
export const pool = new pg.Pool({
	connectionString: process.env.POSTGRES_URL,
	ssl: true
});


export const db = drizzle(pool, { schema });
console.log(process.env.REDIS_QUEUE)
export const redis = new Redis("rediss://default:AXsoAAIjcDE5ZjM3MDVmYzNmMjE0MmI4OGUyYWNmZDhjODQ0YjE0NHAxMA@humble-stud-31528.upstash.io:6379");
function processTaskQueue() {
	redis.brpop('MAINTENECE_QUEUE', 0, async (err, result) => {
		if (err) {
			console.error('Error processing task from queue:', err);
		} else if (result) {
			const task = result[1];
			console.log(`Processing task: ${task}`);
			const job = JSON.parse(task)
			const time = getNextThreeHours()
			console.log(time)
			try {
				await db.insert(schema.jobs).values({ name: job.task, machine_id: job.machine_id, timesc: time.toISOString() })

			} catch (e) {

			}

			processTaskQueue();
		}
	});
}

processTaskQueue();

