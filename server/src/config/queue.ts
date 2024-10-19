import { Queue } from "bullmq";
import Redis from "ioredis";

export const redis = new Redis({
	host: process.env.REDIS_QUEUE,

})

export const queue = new Queue('smartCarQueue', {
	connection: redis
});

