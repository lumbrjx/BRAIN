import { Queue } from "bullmq";
import Redis from "ioredis";

export const redis = new Redis({
	host: process.env.REDIS_QUEUE,
	connectTimeout: 300000

})
export const queue = new Queue("smartCarQueue", {
	connection: redis
});

