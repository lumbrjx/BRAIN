import { Queue } from "bullmq";
import { config } from "dotenv";
import Redis from 'ioredis';
config()

export const redis = new Redis({
	host: process.env.REDIS_QUEUE,

})
export const queue = new Queue('smartCarQueue', {
	connection: redis
});


